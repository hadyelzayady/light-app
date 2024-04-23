interface ITreeNode {}
class TreeNode implements ITreeNode {
	key: string;
	constructor(key: string) {
		this.key = key;
	}
}

interface BStarNodeKey {
	key: string;
	value?: any;
}
