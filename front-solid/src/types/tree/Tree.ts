export class BStarNode {
	nodeKeys: BStarNodeKey[] = [];
	subTrees: BStarNode[] = [];
	parent?: BStarNode;
	nextNode?: BStarNode;
}

export class BStarTree {
	private _order: number = 4;
	rootNode: BStarNode = new BStarNode();
	private minimumKeysLength: number = Math.ceil(this.order / 2) - 1;

	public set order(value: number) {
		this._order = value;
		this.minimumKeysLength = Math.ceil(this.order / 2) - 1;
	}
	public get order() {
		return this._order;
	}

	private getInsertionIndex(key: string, node: BStarNode) {
		const index = node.nodeKeys.findIndex((k) => parseInt(k.key) > parseInt(key));
		return index === -1 ? node.nodeKeys.length : index;
	}
	static isLeafNode(node: BStarNode) {
		return node.subTrees.length === 0;
	}

	insertNode(key: string, value: any) {
		this.insertNodeRecur(this.rootNode, key, value);
	}

	findNode(key: string) {
		return this.findNodeRecur(this.rootNode, key);
	}

	deleteNode(key: string) {
		this.deleteNodeRecur(this.rootNode, key);
	}
	getIndex(nodeKeys: BStarNodeKey[], comparator: (k: BStarNodeKey) => boolean) {
		const index = nodeKeys.findIndex((k) => comparator(k));
		return index === -1 ? nodeKeys.length : index;
	}

	private deleteLeafNode(node: BStarNode, key: string) {
		const index = node.nodeKeys.findIndex((k) => parseInt(k.key) === parseInt(key));
		if (index === -1 || !node.parent) {
			return false;
		}
		const parentSubtreeindex = this.getIndex(node.parent.nodeKeys, (k) => parseInt(k.key) >= parseInt(key));

		node.nodeKeys.splice(index, 1);
		const leftSiblingNodeIndex = parentSubtreeindex;
		const leftNode = leftSiblingNodeIndex !== undefined ? node.parent.subTrees[leftSiblingNodeIndex] : undefined;
		if (this.needsRebalance(node)) {
			if (leftNode && leftNode.nodeKeys?.length > this.minimumKeysLength) {
				const rightMostKey = leftNode.nodeKeys.pop()!;
				node.nodeKeys.unshift(rightMostKey);
				if (parentSubtreeindex !== undefined && parentSubtreeindex !== -1) {
					node.parent?.nodeKeys.splice(parentSubtreeindex, 1, {
						...rightMostKey,
						value: undefined,
					});
				}
			} else if (node.nextNode && node.nextNode?.nodeKeys?.length > this.minimumKeysLength) {
				const leftMostKey = node.nextNode.nodeKeys.shift()!;
				node.nodeKeys.push(leftMostKey);
				const currentNodeSubTreeIndexInParent = node.parent?.nodeKeys.findIndex(
					(k) => parseInt(k.key) >= parseInt(leftMostKey.key),
				);
				if (currentNodeSubTreeIndexInParent !== undefined && currentNodeSubTreeIndexInParent !== -1) {
					node.parent?.nodeKeys.splice(currentNodeSubTreeIndexInParent, 1, {
						...node.nextNode.nodeKeys[0],
						value: undefined,
					});
				}
			}
		}
	}
	private deleteInnerNode(node: BStarNode, key: string) {
		// TODO: on delete inner node, merge its left and right subtree into one one if no child will replace the deleted  key
		const index = node.nodeKeys.findIndex((k) => parseInt(k.key) === parseInt(key));
		if (index === -1) {
			return false;
		}
		// TODO: what if the subtrees has no children
		const replacement = node.subTrees[index + 1].nodeKeys[0];
		if (replacement) {
			node.nodeKeys.splice(index, 1, { ...replacement, value: undefined });
		} else {
			node.subTrees[index].nodeKeys.push(...node.subTrees[index + 1].nodeKeys);
			node.subTrees.splice(index + 1, 1);
		}
	}

	private deleteNodeRecur(node: BStarNode, key: string) {
		if (BStarTree.isLeafNode(node)) {
			this.deleteLeafNode(node, key);
		} else {
			const index = node.nodeKeys.findIndex((k) => parseInt(k.key) > parseInt(key));
			const subTreeIndex = index === -1 ? node.nodeKeys.length : index;
			this.deleteNodeRecur(node.subTrees[subTreeIndex], key);
			if (node.nodeKeys.some((k) => k.key === key)) {
				this.deleteInnerNode(node, key);
			}
		}
	}

	private findNodeRecur(node: BStarNode, key: string): BStarNodeKey | undefined {
		const index = node.nodeKeys.findIndex((k) => parseInt(k.key) >= parseInt(key));
		const possibleNodeIndex = index === -1 ? node.nodeKeys.length : index;
		const isLeafNode = BStarTree.isLeafNode(node);
		if (node.nodeKeys[possibleNodeIndex]?.key === key) {
			if (isLeafNode) {
				return node.nodeKeys[possibleNodeIndex];
			} else {
				return this.findNodeRecur(node.subTrees[possibleNodeIndex + 1], key);
			}
		} else if (!isLeafNode) {
			return this.findNodeRecur(node.subTrees[possibleNodeIndex], key);
		}
	}

	private insertNodeRecur(rootNode: BStarNode, key: string, value: any) {
		const insertIndex = this.getInsertionIndex(key, rootNode);
		if (BStarTree.isLeafNode(rootNode)) {
			if (rootNode.nodeKeys?.some((k) => k.key === key)) {
				console.warn("Key Already Exists");
				return;
			}
			rootNode.nodeKeys.splice(insertIndex, 0, { key, value });
		} else {
			this.insertNodeRecur(rootNode.subTrees[insertIndex], key, value);
		}

		if (this.needsRebalance(rootNode)) {
			this.splitNode(rootNode);
		}
	}

	private splitNode(node: BStarNode) {
		const middle = Math.ceil(node.nodeKeys.length / 2);
		const splitNode = node.nodeKeys[middle];
		let parent: BStarNode | undefined = node.parent;
		if (!node.parent) {
			parent = new BStarNode();
			node.parent = parent;
			this.rootNode = parent;
		}
		const insertionIndex = this.getInsertionIndex(splitNode.key, node.parent);
		node.parent.nodeKeys.splice(insertionIndex, 0, { ...splitNode, value: undefined });
		// start region
		const leftNode: BStarNode = new BStarNode();
		const splitIndex = BStarTree.isLeafNode(node) ? middle : middle + 1;
		leftNode.subTrees = node.subTrees.slice(0, middle + 1).map((s) => ({ ...s, parent: leftNode }));
		leftNode.nodeKeys = node.nodeKeys.slice(0, middle);
		leftNode.parent = parent;
		const rightNode: BStarNode = new BStarNode();
		rightNode.subTrees = node.subTrees.slice(middle + 1).map((s) => ({ ...s, parent: rightNode }));
		rightNode.nodeKeys = node.nodeKeys.slice(splitIndex);
		rightNode.parent = parent;
		leftNode.nextNode = rightNode;
		rightNode.nextNode = parent?.subTrees[insertionIndex + 1];
		if (parent?.subTrees?.[insertionIndex - 1]) {
			parent.subTrees[insertionIndex - 1].nextNode = leftNode;
		}
		// end region
		parent?.subTrees.splice(insertionIndex, 1, leftNode);
		parent?.subTrees.splice(insertionIndex + 1, 0, rightNode);
	}

	private needsRebalance(node: BStarNode) {
		const keysLimitExceeded = node.nodeKeys.length > this.order - 1 || node.nodeKeys.length < this.minimumKeysLength;
		const subTreesLimit = node.subTrees.length > this.order || node.subTrees.length < node.subTrees.length / 2;
		return keysLimitExceeded || subTreesLimit;
	}
}
