<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getSelectedTabContext } from './selectedTabContext';

	interface Props {
		tab: string;
		children: Snippet;
	}

	const { tab, children }: Props = $props();
	const selectedTabContext = getSelectedTabContext();
	const isSelected = $derived(selectedTabContext.selectedTab === tab);

	function handleClick() {
		selectedTabContext.selectedTab = tab;
	}
</script>

<button
	onclick={handleClick}
	class:pb-1={isSelected}
	class:border-b-4={isSelected}
	class="hover-bg border-white/25 p-2"
>
	{@render children()}
</button>
