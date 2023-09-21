<script lang='ts'>
    export let title: string;
</script>

<div class="border border-neutral-200 dark:border-neutral-800 rounded-md relative">
	<div class="p-6">
        <h4 class="text-xl font-semibold">{title}</h4>
		<slot name="subtitle" />
		<slot />
	</div>
    {#if $$slots.statusText && $$slots.footerActions}
	<footer class="flex justify-between items-center w-full py-3 px-6 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 rounded-b-md">
		<slot name="statusText" />
		<slot name="footerActions" />
	</footer>
    {/if}
</div>