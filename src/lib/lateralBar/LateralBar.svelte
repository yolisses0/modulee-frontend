<script lang="ts">
	import EditGroupPage from './EditGroupPage.svelte';
	import GroupsPage from './GroupsPage.svelte';
	import LateralBarTabs from './LateralBarTabs.svelte';
	import { getSelectedTabContext } from './selectedTabContext';

	const selectedTabContext = getSelectedTabContext();
</script>

<div class="w-full max-w-xs border-l border-black">
	<LateralBarTabs />
	{#if selectedTabContext.selectedTab === 'group'}
		<EditGroupPage />
	{:else if selectedTabContext.selectedTab === 'groups'}
		<GroupsPage />
	{/if}
</div>
