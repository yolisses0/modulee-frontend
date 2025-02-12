import type { ExtrasData } from '$lib/data/ExtrasData';
import { ById } from '$lib/editor/ById.svelte';
import type { EditorData } from '$lib/editor/EditorData';
import { expect, test } from 'vitest';
import { SetGroupNodeGroupIdCommand } from './SetGroupNodeGroupIdCommand';
import { mockCommandData } from './test/mockNodeData';

test('SetGroupNodeGroupIdCommand', () => {
	const editorData = {
		nodes: new ById([
			{ id: 'node1' },
			{ id: 'node2', type: 'GroupNode', extras: { groupId: 'group1' } as ExtrasData },
			{ id: 'node3' },
		]),
	} as EditorData;
	const command = new SetGroupNodeGroupIdCommand(
		mockCommandData({ nodeId: 'node2', groupId: 'group2' }),
	);

	command.execute(editorData);

	expect(editorData.nodes.get('node2').extras.groupId).toBe('group2');

	command.undo(editorData);

	expect(editorData.nodes.get('node2').extras.groupId).toBe('group1');
});

test('SetGroupNodeGroupIdCommand with wrong type', () => {
	const editorData = {
		nodes: new ById([
			{ id: 'node1' },
			{ id: 'node2', type: 'GroupNode', extras: { groupId: 1 } as ExtrasData },
			{ id: 'node3' },
		]),
	} as EditorData;
	const command = new SetGroupNodeGroupIdCommand(
		mockCommandData({ nodeId: 'node3', groupId: 'group1' }),
	);

	expect(() => {
		command.execute(editorData);
	}).toThrow();
});
