import type { GraphData } from '$lib/data/GraphData';
import { Command } from '$lib/editor/Command';

export class SetConstantNodeValueCommand extends Command<{
	value: number;
	nodeId: string;
}> {
	previousValue!: number;

	execute(graphData: GraphData): void {
		const { value, nodeId } = this.details;
		const node = graphData.nodes.get(nodeId);
		if (node.type !== 'ConstantNode') {
			throw new Error("Can't change the value of a node with type different than ConstantNode");
		}
		this.previousValue = node.extras.value as number;
		node.extras.value = value;
	}

	undo(graphData: GraphData): void {
		const { nodeId } = this.details;
		const node = graphData.nodes.get(nodeId);
		if (node.type !== 'ConstantNode') {
			throw new Error("Can't change the value of a node with type different than ConstantNode");
		}
		node.extras.value = this.previousValue;
	}
}
