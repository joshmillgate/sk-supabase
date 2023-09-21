<script lang="ts">
	import type { PageData } from './$types.js';
	export let data: PageData;
</script>


<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
	{#if data.session}
		<p class="text-primary">Welcome, {data.session.user.email}</p>
	{/if}
</div>
