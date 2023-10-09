<script lang="ts">
	export let title: string;
</script>

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
