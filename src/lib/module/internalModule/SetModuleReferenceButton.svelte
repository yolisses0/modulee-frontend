<script lang="ts">
	import { getRootElementContext } from 'nodes-editor';
	import type { Snippet } from 'svelte';
	import Portal from 'svelte-portal';
	import SetModuleReferenceMenuWrapper from './SetModuleReferenceMenuWrapper.svelte';

	interface Props {
		moduleNodeId: string;
		children: Snippet;
	}

	const { children, moduleNodeId }: Props = $props();

	let mouseEvent = $state<MouseEvent>();

	function handlePointerDown(e: PointerEvent) {
		e.stopPropagation();
	}

	function handleClick(e: MouseEvent) {
		mouseEvent = e;
	}

	const rootElementContext = getRootElementContext();
</script>

<button onclick={handleClick} onpointerdown={handlePointerDown} class="hover-bg">
	{@render children()}
</button>

{#if rootElementContext.rootElement}
	<Portal target={rootElementContext.rootElement as HTMLElement}>
		<SetModuleReferenceMenuWrapper {mouseEvent} {moduleNodeId} />
	</Portal>
{/if}
