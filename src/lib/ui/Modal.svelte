<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		closeModal: () => void;
	}

	const { children, closeModal }: Props = $props();
</script>

<button class="fixed inset-0 bg-black/25" onclick={closeModal} aria-label="Close modal"></button>

<div class="pointer-events-none fixed inset-0 flex items-center justify-center">
	<div class="pointer-events-auto contents">
		{@render children?.()}
	</div>
</div>
