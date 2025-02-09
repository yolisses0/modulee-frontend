import type { ConnectionData } from '$lib/data/ConnectionData';
import type { EditorData } from '$lib/editor/EditorData';
import { expect, test } from 'vitest';
import { SetConnection } from './SetConnection';
import { mockCommandData } from './test/mockNodeData';

test('SetConnection without remotion', () => {
	const editorData = { connections: [] as ConnectionData[] } as EditorData;

	const command = new SetConnection(
		mockCommandData({
			connection: {
				id: 'connection1',
				targetNodeId: 'node2',
				inputPath: {
					nodeId: 'node1',
					inputName: 'input1',
				},
			},
		}),
	);

	command.execute(editorData);

	expect(editorData.connections).toEqual([
		{
			nodeId: 'node1',
			id: 'connection1',
			inputName: 'input1',
			targetNodeId: 'node2',
		},
	]);

	command.undo(editorData);

	expect(editorData.connections).toEqual([]);
});

test('SetConnection with remotion', () => {
	const editorData = {
		connections: [
			{
				id: 'connection1',
				targetNodeId: 'node2',
				inputPath: {
					nodeId: 'node1',
					inputName: 'input1',
				},
			},
		],
	} as EditorData;

	const command = new SetConnection(
		mockCommandData({
			connection: {
				id: 'connection2',
				targetNodeId: 'node3',
				inputPath: {
					nodeId: 'node1',
					inputName: 'input1',
				},
			},
		}),
	);

	command.execute(editorData);

	expect(editorData.connections).toEqual([
		{
			nodeId: 'node1',
			id: 'connection2',
			inputName: 'input1',
			targetNodeId: 'node3',
		},
	]);

	command.undo(editorData);

	expect(editorData.connections).toEqual([
		{
			nodeId: 'node1',
			id: 'connection1',
			inputName: 'input1',
			targetNodeId: 'node2',
		},
	]);
});
