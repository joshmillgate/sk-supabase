<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Edit, Globe } from 'lucide-svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';

	export let data: PageData;

	let { session, profile, avatar_url } = data;
	$: ({ session, profile, avatar_url } = data);

	let avatarPublicUrl = avatar_url.publicUrl;
	$: avatarPublicUrl = avatar_url.publicUrl;

	let firstInitial: string;
	let secondInitial: string;
	let initials: string;
	let words = profile?.full_name.split(' ');

	firstInitial = words[0][0];
	secondInitial = words[1][0];
	initials = firstInitial + secondInitial;
</script>

{#if !profile?.username || !profile?.full_name}
	<h2>Set up your profile</h2>
	<Dialog.Root open closeOnOutsideClick={false} closeOnEscape={false}>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Create a Profile</Dialog.Title>
				<Dialog.Description>Enter your information below to create your profile</Dialog.Description>
				<form method="post" use:enhance>
					<div class="flex flex-col w-full gap-3 my-3">
						<div class="flex flex-col w-full">
							<Input id="full_name" name="full_name" placeholder="Name" type="text" />
						</div>
						<div class="flex flex-col w-full">
							<Input id="username" name="username" placeholder="Username" type="text" />
						</div>
						<div class="flex flex-col w-full">
							<Input id="website" name="website" placeholder="Website link" type="url" />
						</div>
						<Button type="submit" class="w-full mt-6">Create profile</Button>
					</div>
				</form>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>
{:else}
	{#key avatarPublicUrl}
		<Avatar.Root class="w-20 h-20 mr-3">
			<Avatar.Image src={avatarPublicUrl} alt="@shadcn" />
			<Avatar.Fallback>{initials}</Avatar.Fallback>
		</Avatar.Root>
	{/key}
	<div class="mt-4">
		<h1 class="text-xl font-semibold">{profile?.full_name}</h1>
		<p class="text-l opacity-60">@{profile?.username}</p>
		<div class="flex items-center gap-2 mt-5">
			<Tooltip.Root>
				<Tooltip.Trigger>
					<Button href="https://x.com/{profile?.xcom}" target="_blank" variant="outline" size="sm" class="text-xl"
						>𝕏</Button
					>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>@{profile?.xcom}</p>
				</Tooltip.Content>
			</Tooltip.Root>

			{#if !profile?.website && session.user.id === profile?.id}
				<Button variant="link" href="/settings/profile"
					><Edit class="mr-2 h-3.5 w-3.5" />Add a website</Button
				>
			{:else}
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button href={profile?.website} target="_blank" variant="outline" size="sm"
							><Globe class="h-4 w-4" /></Button
						>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>{profile?.website}</p>
					</Tooltip.Content>
				</Tooltip.Root>
			{/if}
		</div>
	</div>
{/if}
{#if session.user.id === profile?.id}
	<Button href="/settings/profile" size="sm" variant="outline" class="mt-4 font-normal"
		><Edit class="mr-2 h-3.5 w-3.5" />Edit profile</Button
	>
{/if}
