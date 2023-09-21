<script lang="ts">
	export let value: any = '';
	export let placeholder = '';
	export let label: string;
	export let id: string;
	export let type = 'text';
	export let disabled = false;
	export let required = false;
	export let error = false;
	export let errorText = '';
	export let size = '';
</script>

<div class="form-control my-3">
	<label for={id} class="label">{label}</label>
	<input
		{type}
		{placeholder}
		{required}
		{disabled}
		{id}
		{value}
		name={id}
		class="input input-bordered {size === 'sm' ? 'input-sm' : ''} {size === 'lg'
			? 'input-lg'
			: ''} {size === 'xs' ? 'input-xs' : ''}"
	/>
	{#if error}
		<p class="mt-2 text-sm text-red-600" id="email-error">
			{errorText}
		</p>
	{/if}
</div>
