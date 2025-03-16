import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { ExternalModuleData } from '$lib/module/ExternalModuleData';
import { internalizeGraphParts } from './internalizeGraphParts';
import { internalizeModuleNodeModuleReferences } from './internalizeModuleNodeModuleReferences';

// TODO add connections
export function internalizeModules(
	graphRegistry: GraphRegistry,
	externalModulesData: ExternalModuleData[],
) {
	externalModulesData.map((externalModuleData) => {
		internalizeGraphParts(graphRegistry, externalModuleData.graph);
	});
	internalizeModuleNodeModuleReferences(graphRegistry, externalModulesData);
}
