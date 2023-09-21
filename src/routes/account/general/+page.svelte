<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Fieldset } from '$lib/components/ui/fieldset';
	import * as Alert from '$lib/components/ui/alert';
	import { Check, AlertCircle, Loader2 } from 'lucide-svelte';
	import Avatar from './Avatar.svelte';

	export let data;
	export let form;
	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);

	let profileForm: HTMLFormElement;
	let loading = false;
	let fullName: string = profile?.full_name ?? '';
	let username: string = profile?.username ?? '';
	let website: string = profile?.website ?? '';
	let avatarUrl: string = profile?.avatar_url ?? '';

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};
</script>

<form method="post" action="?/update" use:enhance={handleSubmit} bind:this={profileForm}>
	<div class="flex flex-col w-full gap-3">
		<Fieldset title="Avatar">
			<p slot="subtitle" class="my-3 dark:text-neutral-400 font-light">
				Your Username will be used on your public profile.
			</p>
			<div class="absolute right-5 top-5">
				<Avatar
					{supabase}
					bind:url={avatarUrl}
					size={5}
					on:upload={() => {
						profileForm.requestSubmit();
					}}
				/>
			</div>
		</Fieldset>
		<Fieldset title="Email">
			<p slot="subtitle" class="my-3 dark:text-neutral-400 font-light">
				Please enter the email address you want to use to log in with.
			</p>
			<Input name="email" id="email" type="text" value={session.user.email} disabled />
			<p slot="statusText" class="dark:text-neutral-600">We will email you to verify the change.</p>
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
		<Fieldset title="Name">
			<p slot="subtitle" class="my-3 dark:text-neutral-400 font-light">
				Please enter your full name, or a display name you are comfortable with.
			</p>
			<Input
				name="fullName"
				id="fullName"
				type="text"
				value={form?.fullName ?? fullName}
				placeholder="Full name"
			/>
			<p slot="statusText" class="dark:text-neutral-600">Please use 32 characters at maximum.</p>
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
		<Fieldset title="Username">
			<p slot="subtitle" class="my-3 dark:text-neutral-400 font-light">
				Your Username will be used on your public profile.
			</p>
			<Input
						name="username"
						id="username"
						type="text"
						value={form?.username ?? username}
						placeholder="Username"
					/>
			<p slot="statusText" class="dark:text-neutral-600">Please use 32 characters at maximum.</p>
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
		<Fieldset title="Website">
			<p slot="subtitle" class="my-3 dark:text-neutral-400 font-light">
				Your Username will be used on your public profile.
			</p>
			<Input
						name="website"
						id="website"
						type="url"
						value={form?.website ?? website}
						placeholder="Website URL"
					/>
			<p slot="statusText" class="dark:text-neutral-600">Please use 32 characters at maximum.</p>
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
		
		<!-- <form method="post" action="?/signout" use:enhance={handleSignOut}>
			<div>
				<button class="button block" disabled={loading}>Sign Out</button>
			</div>
		</form> -->
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
	</div>
</form>


