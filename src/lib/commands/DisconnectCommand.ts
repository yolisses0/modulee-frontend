import type { ConnectionData } from '$lib/data/ConnectionData';
import { getAreInputPathsEqual } from '$lib/data/getAreInputPathsEqual';
import type { GraphData } from '$lib/data/GraphData';
import type { InputPath } from '$lib/data/InputPath';
import { Command } from '$lib/editor/Command';

export class DisconnectCommand extends Command<{
	inputPath: InputPath;
}> {
	connectionsData!: ConnectionData[];

	execute(graphData: GraphData): void {
		this.connectionsData = graphData.connections.removeByCondition((connectionData) =>
			getAreInputPathsEqual(connectionData.inputPath, this.details.inputPath),
		);
	}

	undo(graphData: GraphData): void {
		this.connectionsData.forEach((connectionData) => {
			graphData.connections.add(connectionData);
		});
	}
}
