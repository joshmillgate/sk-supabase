<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	export let title: string;
	export let actionName: string;
	let form: HTMLFormElement;
	let loading = false;

	export const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async (result) => {
			loading = false;
			console.log('form submit')
		};
	};
</script>

<form method="post" action="?/update{actionName}" use:enhance={handleSubmit} bind:this={form}>
	<div class="border rounded-md relative dark:bg-muted">
		<div class="p-6">
			<h4 class="text-xl font-semibold">{title}</h4>
			<slot name="subtitle" />
			<slot />
		</div>
		{#if $$slots.statusText && $$slots.footerActions}
			<footer
				class="flex justify-between items-center w-full py-3 px-6 border-t rounded-b-md bg-secondary"
			>
				<slot name="statusText" />
				<slot name="footerActions" />
			</footer>
		{/if}
	</div>
</form>
