<script lang="ts">
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import EditUserButton from './EditUserButton.svelte';
	import LogoutButton from './LogoutButton.svelte';
	import type { UserData } from './UserData';
	import { getUserDataContext } from './userDataContext';

	interface Props {
		userData: UserData;
	}

	const { userData }: Props = $props();
	const userDataContext = getUserDataContext();
</script>

<ListPageLayout title={userData.name}>
	{#snippet topChildren()}
		{#if userData.id === userDataContext.userData?.id}
			<LogoutButton />
			<EditUserButton />
		{/if}
	{/snippet}
	<div>
		<div>Username</div>
		<div>
			{userData.username}
		</div>
	</div>
	{#if userData.bio}
		<div>
			<div>Bio</div>
			<p>{userData.bio}</p>
		</div>
	{/if}
</ListPageLayout>
