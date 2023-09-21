<script lang="ts">
	import type { PageData } from './$types.js';
	export let data: PageData;
</script>


<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
	{#if data.session}
		<p>Welcome, {data.session.user.email}</p>
	{/if}
	<h1>Welcome to SvelteKit</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</div>
