<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { SubmitFunction } from '@sveltejs/kit';
	import toast, { Toaster } from 'svelte-french-toast';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Fieldset } from '$lib/components/ui/fieldset';
	import * as Alert from '$lib/components/ui/alert';
	import { Check, AlertCircle, Loader2 } from 'lucide-svelte';
	import Avatar from './Avatar.svelte';
	import type { PageData } from './$types.js';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte'

	export let data: PageData;
	const { form, errors, enhance } = superForm(data.form);

	// console.log(data)

	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);

	let profileForm: HTMLFormElement;
	let loading = false;

	// export const handleSubmit: SubmitFunction = () => {
	// 	loading = true;
	// 	return async (result) => {
	// 		loading = false;
	// 	};
	// };
</script>

<Toaster />
<SuperDebug data={$form} />
{#if $errors}
<p>{$errors}</p>
{/if}
<div class="flex flex-col w-full gap-3">
	<form method="post" action="?/updateProfile" use:enhance bind:this={profileForm}>
		<!-- <form method="post" action="?/updateProfile" use:enhance={handleSubmit} bind:this={profileForm}> -->
		<Fieldset title="Avatar">
			<p slot="subtitle" class="my-3">Your Username will be used on your public profile.</p>
			<div class="absolute right-5 top-5">
				<Avatar
					{supabase}
					bind:url={$form.avatar_url}
					size={5}
					on:upload={() => {
						profileForm.requestSubmit();
					}}
				/>
			</div>
		</Fieldset>
		<h2 class="font-bold">Email</h2>
		<Input name="email" id="email" type="text" bind:value={session.user.email} disabled />

		<h2 class="font-bold">Name</h2>
		<Input
			name="full_name"
			id="full_name"
			type="text"
			bind:value={$form.full_name}
			placeholder="Full name"
		/>
		<h2 class="font-bold">Username</h2>
		<Input
			name="username"
			id="username"
			type="text"
			bind:value={$form.username}
			placeholder="Username"
		/>
		<h2 class="font-bold">Website</h2>
		<Input
			name="website"
			id="website"
			type="url"
			bind:value={$form.website}
			placeholder="Website URL"
		/>

		<Button type="submit" disabled={loading} size="sm" class="ml-auto font-normal"
			>{#if loading}
				<Loader2 class="animate-spin h-4 w-4" />
			{:else}
				Save
			{/if}</Button
		>
	</form>

	<!-- <form method="post" action="?/signout" use:enhance={handleSignOut}>
			<div>
				<button class="button block" disabled={loading}>Sign Out</button>
			</div>
		</form> -->
	<!-- {#if form?.message}
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
	{/if} -->
</div>
<!-- </form> -->
