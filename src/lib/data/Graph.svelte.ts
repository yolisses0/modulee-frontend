import { ById } from '$lib/editor/ById';
import { ReactiveById } from '$lib/editor/ReactiveById.svelte';
import { Connection } from './Connection';
import type { Connector } from './Connector';
import type { GraphData } from './GraphData';
import { Group } from './Group.svelte';
import { GroupNode } from './GroupNode.svelte';
import { Node } from './Node.svelte';

export class Graph {
	nodes = new ReactiveById<Node>();
	groups = new ReactiveById<Group>();
	connectors = new ReactiveById<Connector>();
	connections = new ReactiveById<Connection>();

	constructor(graphData: GraphData) {
		graphData.nodes.values().forEach((nodeData) => {
			let node: Node;
			if (nodeData.type === 'GroupNode' || nodeData.type === 'GroupVoicesNode') {
				node = new GroupNode(nodeData, graphData.connections);
			} else {
				node = new Node(nodeData, graphData.connections);
			}
			this.nodes.add(node);
		});

		graphData.groups.values().forEach((groupData) => {
			const group = new Group(groupData, this.nodes);
			this.groups.add(group);
		});

		this.nodes.values().forEach((node) => {
			if (node instanceof GroupNode) {
				node.updateGroup(this.groups);
			}
		});

		graphData.connections.values().forEach((connectionData) => {
			const connection = new Connection(connectionData);
			this.connections.add(connection);
		});

		this.nodes.values().forEach((node) => {
			this.connectors.add(node.output);
			node.inputs.forEach((input) => {
				this.connectors.add(input);
			});
		});
	}

	getData(): GraphData {
		return {
			groups: ById.fromItems(this.groups.values()),
			connections: ById.fromItems(this.connections.values()),
			nodes: ById.fromItems(this.nodes.values().map((node) => node.getData())),
		};
	}
}
