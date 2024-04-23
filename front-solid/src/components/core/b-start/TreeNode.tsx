import { BStarNode, BStarTree } from "../../../types/tree/Tree";

interface Props {
	node: BStarNode;
	searchKey: string | undefined;
}
export function TreeNode(props: Props) {
	return (
		<div class="flex flex-col gap-20">
			<div style={{ border: "1px solid white", width: "fit-content" }}>
				{props.node.nodeKeys.map((k, index) => {
					const isLeaf = BStarTree.isLeafNode(props.node);
					return (
						<>
							<span
								style={{
									border: "1px yellow solid",
									margin: "5px",
									padding: "0px 5px",
									color: k.value ? "#00ba4c" : "white",
									background: props.searchKey === k.key && isLeaf ? "green" : "",
								}}
							>
								{k.key}
							</span>
							{index === props.node.nodeKeys.length - 1 ? <span>{props.node.nextNode?.nodeKeys[0].key}</span> : null}
						</>
					);
				})}
			</div>
			<div class="flex flex-row gap-20">
				{props.node.subTrees.map((t) => (
					<TreeNode node={t} searchKey={props.searchKey} />
				))}
			</div>
		</div>
	);
}
