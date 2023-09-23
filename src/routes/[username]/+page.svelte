<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';

	export let data: PageData;

	let { supabase, session, profile } = data;
	$: ({ supabase, session, profile } = data);

	let isUserProfile = false;
	if (session.user.id === profile?.id) {
		isUserProfile = true;
	}

	let firstInitial: string;
	let secondInitial: string;
	let initials: string;
	let words = profile?.full_name.split(' ');

	firstInitial = words[0][0];
	secondInitial = words[1][0];
	initials = firstInitial + secondInitial;

	const { data: avatarUrl } = supabase.storage.from('avatars').getPublicUrl(profile?.avatar_url);
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
							<Input id="fullName" name="fullName" placeholder="Name" type="text" />
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
	<Avatar.Root class="w-20 h-20 mr-3">
		<Avatar.Image src={avatarUrl.publicUrl} alt="@shadcn" />
		<Avatar.Fallback>{initials}</Avatar.Fallback>
	</Avatar.Root>
	<div class="mt-4">
		<h1 class="text-xl font-semibold">{profile?.full_name}</h1>
		<h2>@{profile?.username}</h2>
		{#if isUserProfile && !profile?.website}
			<p>Add a link to your website</p>
		{:else}
			<a class="text-neutral-400 hover:text-neutral-500" href={profile?.website}
				>{profile?.website}</a
			>
		{/if}
	</div>
{/if}
