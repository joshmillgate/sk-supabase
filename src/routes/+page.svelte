<script lang="ts">
	import type { PageData } from './$types.js';
	export let data: PageData;

	let { supabase, session, profileList } = data;
	$: ({ supabase, session, profileList } = data);

</script>

<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
	{#if data.session}
		<h1 class="text-4xl font-bold mb-4">Dashboard</h1>
		<p class="text-primary">Welcome, {data.session.user.email}</p>

		<div class="mt-6">
			<h3>Other people:</h3>
			{#each profileList as profile}
				{#if profile.id !== data.session.user.id}
					<p><a href="/{profile.username}">{profile.full_name}</a></p>
				{/if}
			{/each}
		</div>
	{/if}
</div>
