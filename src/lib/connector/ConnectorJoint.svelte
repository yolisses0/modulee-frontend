<script lang="ts">
	import type { Connector } from '$lib/data/Connector';
	import { ConnectorJoint as ConnectorJointBase } from 'nodes-editor';

	interface Props {
		connector: Connector;
	}

	const { connector }: Props = $props();
</script>

<ConnectorJointBase connectorId={connector.id}>
	<div
		style:width="0.4lh"
		style:height="0.4lh"
		class="flex shrink-0 items-center justify-center rounded-full bg-green-500"
	></div>
</ConnectorJointBase>
