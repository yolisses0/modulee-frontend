import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { EditorCommand } from '$lib/editor/EditorCommand';

export class SetConstantNodeValueCommand extends EditorCommand<{
	value: number;
	nodeId: string;
}> {
	static name = 'SetConstantNodeValueCommand';

	previousValue!: number;

	execute(graphData: GraphRegistry): void {
		const { value, nodeId } = this.details;
		const node = graphData.nodes.get(nodeId);
		if (node.type !== 'ConstantNode') {
			throw new Error("Can't change the value of a node with type different than ConstantNode");
		}
		this.previousValue = node.extras.value as number;
		node.extras.value = value;
	}

	undo(graphData: GraphRegistry): void {
		const { nodeId } = this.details;
		const node = graphData.nodes.get(nodeId);
		if (node.type !== 'ConstantNode') {
			throw new Error("Can't change the value of a node with type different than ConstantNode");
		}
		node.extras.value = this.previousValue;
	}
}
