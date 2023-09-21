<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import * as Alert from '$lib/components/ui/alert';
	import { Fieldset } from '$lib/components/ui/fieldset';
	import { Check, AlertCircle, Loader2 } from 'lucide-svelte';

	export let data;
	export let form;
	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);

	let profileForm: HTMLFormElement;
	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};
</script>

<form method="post" action="?/updatePassword" use:enhance={handleSubmit} bind:this={profileForm}>
	<Fieldset title="Password">
		<p slot="subtitle" class="p-margin">
			Update your password below.
		</p>
		<Input
				name="currentPassword"
				id="currentPassword"
				type="password"
				placeholder="Current Password"
				class="mb-2"
			/>
			<Input name="newPassword" id="newPassword" type="password" placeholder="New Password" />
		<p slot="statusText">We will email you to verify the change.</p>
		<div slot="footerActions">
			<Button type="submit" disabled={loading} size="sm" class="ml-auto font-normal"
				>{#if loading}
					<Loader2 class="animate-spin h-4 w-4" />
				{:else}
					Save
				{/if}</Button
			>
		</div>
	</Fieldset>
	{#if form?.message}
		<Alert.Root class="mt-4" variant={form.success ? 'success' : 'destructive'}>
			{#if form.success}
				<Check class="h-4 w-4" />
			{:else}
				<AlertCircle class="h-4 w-4" />
			{/if}
			<Alert.Title>{form.success ? 'Success!' : 'Error'}</Alert.Title>
			<Alert.Description>
				{form.message || ''}
			</Alert.Description>
		</Alert.Root>
	{/if}
</form>
