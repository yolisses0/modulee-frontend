import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { ModuleReference } from '$lib/data/ModuleReference';
import { EditorCommand } from '$lib/editor/EditorCommand';

export class SetModuleNodeModuleReferenceCommand extends EditorCommand<{
	moduleNodeId: string;
	moduleReference: ModuleReference;
}> {
	static name = 'SetModuleNodeModuleReferenceCommand';

	previousModuleReference!: ModuleReference;

	execute(graphRegistry: GraphRegistry): void {
		const { moduleReference: targetInternalModuleId, moduleNodeId } = this.details;
		const node = graphRegistry.nodes.get(moduleNodeId);
		if (node.type !== 'ModuleNode' && node.type !== 'ModuleVoicesNode') {
			throw new Error("Can't change the internalModuleId of a non internalModule node");
		}
		this.previousModuleReference = node.extras.moduleReference;
		node.extras.moduleReference = targetInternalModuleId;
	}

	undo(graphRegistry: GraphRegistry): void {
		const { moduleNodeId } = this.details;
		const node = graphRegistry.nodes.get(moduleNodeId);
		if (node.type !== 'ModuleNode' && node.type !== 'ModuleVoicesNode') {
			throw new Error("Can't change the internalModuleId of a non internalModule node");
		}
		node.extras.moduleReference = this.previousModuleReference;
	}
}
