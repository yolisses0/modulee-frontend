<script lang="ts">
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import Spinner from '$lib/ui/Spinner.svelte';
	import ExternalModuleList from './ExternalModuleList.svelte';
	import { getExternalModulesRepository } from './getExternalModulesRepository';

	const externalModulesRepository = getExternalModulesRepository();

	let externalModulesDataPromise = $state(externalModulesRepository.getExternalModules());
</script>

<ListPageLayout title="External modules">
	{#await externalModulesDataPromise}
		<div class="flex h-full flex-1 flex-col items-center p-8">
			<Spinner />
		</div>
	{:then externalModulesData}
		<ExternalModuleList {externalModulesData} />
	{:catch error}
		<div class="text-red-500">
			<div>It was not possible to load the external modules</div>
			<div>{error}</div>
		</div>
	{/await}
</ListPageLayout>
