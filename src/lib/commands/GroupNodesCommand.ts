import { removeById } from '$lib/array/removeById';
import type { GroupData } from '$lib/data/GroupData';
import type { NodeData } from '$lib/data/NodeData';
import { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';

export class GroupNodesCommand extends Command<{
	group: GroupData;
	nodesId: string[];
	groupNodeData: NodeData;
}> {
	previousGroupIds!: Record<string, string>;

	execute(editorData: EditorData): void {
		editorData.groups.push(this.details.group);

		this.previousGroupIds = {};
		editorData.nodes.forEach((nodeData) => {
			if (this.details.nodesId.includes(nodeData.id)) {
				this.previousGroupIds[nodeData.id] = nodeData.groupId;
				nodeData.groupId = this.details.group.id;
			}
		});

		editorData.nodes.push(this.details.groupNodeData);
	}

	undo(editorData: EditorData): void {
		removeById(editorData.groups, this.details.group.id);
		removeById(editorData.nodes, this.details.groupNodeData.id);
		editorData.nodes.forEach((nodeData) => {
			const previousGroupId = this.previousGroupIds[nodeData.id];
			if (previousGroupId) {
				nodeData.groupId = previousGroupId;
			}
		});
	}
}
