import { createMemo, createSignal } from "solid-js";
import { Button } from "../../shared/button/Button";
import { BStarNode, BStarTree } from "../../../types/tree/Tree";
import { TreeNode } from "./TreeNode";
import { cloneDeep, random } from "lodash";
import { Node, SolidFlow } from "solid-flow";
import { EdgeProps } from "solid-flow/dist/components";

interface Props {
	value?: number;
}
export function BStar(props: Props) {
	let insertRef: HTMLInputElement | undefined = undefined;
	const [getTree, setTree] = createSignal<BStarTree>(new BStarTree());
	const [searchNode, setSearchNode] = createSignal<BStarNodeKey | undefined>(undefined);
	const [undoStack, setUndoStack] = createSignal<BStarTree[]>([]);
	const insertList: string[] = [];

	function insertKey() {
		setTree((prev) => {
			const value = insertRef?.value?.trim();
			if (insertRef) {
				insertRef.value = "";
			}
			if (value && value.length > 0 && prev.findNode(value) === undefined) {
				prev?.insertNode(value, `value: ${value}`);
				insertList.push(value);
				const newRoot = cloneDeep(prev);
				setUndoStack((undoPrev) => [...undoPrev, prev]);
				return newRoot;
			}
			return prev;
		});
		console.log("tree: ", getTree());
	}

	function deleteKey() {
		setTree((prev) => {
			const value = insertRef?.value?.trim();
			if (insertRef) {
				insertRef.value = "";
			}
			if (value && value.length > 0) {
				prev?.deleteNode(value);
				const newRoot = cloneDeep(prev);
				setUndoStack((undoPrev) => [...undoPrev, prev]);
				return newRoot;
			}
			return prev;
		});
	}

	function findKey(key: string) {
		const foundNode = getTree().findNode(key);
		setSearchNode(foundNode);
		console.log("foundNode: ", foundNode);
	}
	const map = {};

	function buildNodes(nodesList: Node[], node: BStarNode, x: number, y: number) {
		if (node.nodeKeys.length == 0) {
			return;
		}
		nodesList.push({
			id: node.nodeKeys.map((k) => k.key).join("-"),
			position: { x, y },
			data: {
				content: BStarTree.isLeafNode(node) ? <p style={{ width: "100px" }}>Value</p> : null,
				label: node.nodeKeys.map((k) => k.key).join(", "),
			},
			inputs: node.parent ? 1 : 0,
			outputs: node.subTrees.length,
		});
		const width = 100;
		node.subTrees.forEach((subTree, i) => {
			const newY = y - width + i * ((width * 2) / node.subTrees.length + width);
			buildNodes(nodesList, subTree, x + 200, newY);
		});
	}

	function buildEdges(edgesList: EdgeProps[], node: BStarNode) {
		node.subTrees.forEach((subTree, i) => {
			edgesList.push({
				id: node.nodeKeys.map((k) => k.key).join("-") + "-" + subTree.nodeKeys.map((k) => k.key).join("-"),
				sourceNode: node.nodeKeys.map((k) => k.key).join("-"),
				sourceOutput: i,
				targetNode: subTree.nodeKeys.map((k) => k.key).join("-"),
				targetInput: 0,
			});
			buildEdges(edgesList, subTree);
		});
	}

	const nodesAndEdges = createMemo(() => {
		const nodesList: Node[] = [];
		buildNodes(nodesList, getTree().rootNode, 0, 500);
    // TODO: do level traversal to adjust y position of nodes to not be overlap
		console.log("nodesList", nodesList, getTree().rootNode);

		const edgesList: EdgeProps[] = [];
		buildEdges(edgesList, getTree().rootNode);
		console.log("edgesList", edgesList);
		return { nodesList, edgesList };
	});

	return (
		<div class="flex gap-10 flex-col">
			<div class="flex gap-2 flex-row">
				<input
					type="text"
					id="key"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Enter Key"
					style={{ display: "flex", "flex-direction": "column" }}
					ref={insertRef}
					onkeypress={(e) => {
						if (e.key === "Enter") {
							insertKey();
						}
					}}
				/>
				<Button onclick={insertKey}>Insert Key</Button>
				<Button onclick={deleteKey}>Delete Key</Button>
				<Button
					onclick={() => {
						if (insertRef) {
							findKey((insertRef as any).value);
						}
					}}
				>
					Find Key
				</Button>
				<Button
					disabled={undoStack().length === 0}
					onclick={() => {
						setUndoStack((undoPrev) => undoPrev.slice(0, undoPrev.length - 1));
						const lastElement = undoStack().at(-1);
						if (lastElement) {
							setTree(lastElement);
						}
					}}
				>
					undo
				</Button>
				<Button
					onclick={() => {
						setTree(new BStarTree());
					}}
				>
					Clear
				</Button>
				<Button
					onclick={() => {
						localStorage.setItem("tree", JSON.stringify(insertList));
					}}
				>
					Save
				</Button>
				<Button
					onclick={() => {
						const insertListString = localStorage.getItem("tree");
						if (insertListString) {
							const insertList: string[] = JSON.parse(insertListString);
							const tree = new BStarTree();
							insertList.forEach((item) => {
								tree.insertNode(item, `value: ${item}`);
							});
							setTree(tree);
						}
					}}
				>
					Load
				</Button>
				{searchNode() && <span>found: {JSON.stringify(searchNode() ?? "")}</span>}
			</div>
			<SolidFlow
				nodes={nodesAndEdges().nodesList}
				edges={nodesAndEdges().edgesList}
				onNodesChange={(newNodes) => {
					console.log("onCHange", newNodes);
					//setNodes(newNodes);
				}}
				onEdgesChange={(newEdges) => {
					//setEdges(newEdges);
				}}
			/>
		</div>
	);
}
