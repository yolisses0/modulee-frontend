<script lang="ts">
	import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	let { zoom = $bindable() }: { zoom: number } = $props();

	function handleClick() {
		zoom += 1;
	}
</script>

<button class="common-button" onclick={handleClick} title="Zoom in">
	<Fa icon={faMagnifyingGlassPlus} />
</button>
