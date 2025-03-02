import type { NodeData } from '$lib/data/NodeData';
import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/contexts';

export class SelectedAllNodesActionCommand extends ActionCommand {
	nodesData!: NodeData[];

	execute(contexts: Contexts): void {
		const { graph } = contexts.graphContext;
		const { groupId } = contexts.groupIdContext;
		const { selectedNodeIds } = contexts.selectedNodeIdsContext;

		selectedNodeIds.clear();
		// TODO consider creating a context for visible nodes
		graph.nodes.values().forEach((nodeData) => {
			if (nodeData.groupId === groupId) {
				selectedNodeIds.add(nodeData.id);
			}
		});
	}
}
