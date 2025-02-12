import type { Connection } from '$lib/data/Connection';
import type { Node } from '$lib/data/Node.svelte';
import { getNodeExtrasEngineData } from './getNodeExtrasEngineData';
import { getNodeInputIdsEngineData } from './getNodeInputIdsEngineData';
import { hashToUsize } from './hashToUsize';
import type { NodeEngineData } from './NodeEngineData';

export function getNodeEngineData(
	node: Node,
	connections: Connection[],
	fallbackNodeId: number,
): NodeEngineData {
	const extras = getNodeExtrasEngineData(node, fallbackNodeId);
	const inputIds = getNodeInputIdsEngineData(node, connections, fallbackNodeId);
	return {
		extras,
		type: node.type,
		input_ids: inputIds,
		id: hashToUsize(node.id),
	};
}
