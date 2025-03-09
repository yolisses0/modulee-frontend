import type { Remotion } from '$lib/array/remotion';
import type { ConnectionData } from '$lib/data/ConnectionData';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { EditorCommand } from '$lib/editor/EditorCommand';
import { mockCommandData } from '../test/mockNodeData';
import { DisconnectCommand } from './DisconnectCommand';

// TODO add Command suffix
export class SetConnectionCommand extends EditorCommand<{
	connection: ConnectionData;
}> {
	static name = 'SetConnectionCommand';

	disconnectCommand!: DisconnectCommand;
	remotions!: Remotion<ConnectionData>[];

	execute(graphData: GraphRegistry): void {
		const { connection } = this.details;
		this.disconnectCommand = new DisconnectCommand(
			mockCommandData({ inputPath: connection.inputPath }),
		);
		this.disconnectCommand.execute(graphData);
		graphData.connections.set(this.details.connection);
	}

	undo(graphData: GraphRegistry): void {
		graphData.connections.remove(this.details.connection);
		this.disconnectCommand.undo(graphData);
	}
}
