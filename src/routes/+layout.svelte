<script lang="ts">
	import '../app.postcss';
	import type { PageData } from './$types';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';

	import { LogOut, Settings, User } from 'lucide-svelte';

	export let data: PageData;

	let { supabase, session, profile } = data;
	$: ({ supabase, session, profile } = data);

	const { data: avatarUrl } = supabase.storage.from('avatars').getPublicUrl(profile?.avatar_url);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});

	function toggleDark() {
		document.documentElement.classList.toggle('dark');
	}
</script>

<header
	class="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 dark:bg-neutral-950 w-full border-b border-neutral-200 dark:border-neutral-800 bg-background/95 backdrop-blur"
>
	<div class="container flex h-14 items-center">
		<a href="/" class="mr-4 md:flex">Logo</a>
		<div class="flex flex-1 items-center space-x-2 sm:space-x-2 justify-end">
			<button on:click={toggleDark}>Dark</button>
			{#if data.session}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Avatar.Root>
							<Avatar.Image src={avatarUrl.publicUrl} alt="@shadcn" />
							<Avatar.Fallback>JM</Avatar.Fallback>
						</Avatar.Root>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="w-56">
						<DropdownMenu.Group>
							<DropdownMenu.Item>
								<Avatar.Root class="w-5 h-5 mr-3">
									<Avatar.Image src={avatarUrl.publicUrl} alt="@shadcn" />
									<Avatar.Fallback>JM</Avatar.Fallback>
								</Avatar.Root>
								{data.session.user.email}
							</DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.Item>
								<a href="/{profile?.username}" class="flex">
									<User class="mr-2 h-4 w-4" />
									<span>Profile</span>
								</a>
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<a href="/account/general" class="flex">
									<Settings class="mr-2 h-4 w-4" />
									<span>Account</span>
								</a>
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<LogOut class="mr-2 h-4 w-4" />
								<form action="/logout" method="POST">
									<button type="submit">Log out</button>
								</form>
							</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else if $page.url.pathname === '/login'}
				<Button variant="outline" href="/signup">Sign up</Button>
			{:else if $page.url.pathname === '/signup'}
				<Button variant="outline" href="/login">Log in</Button>
			{:else}
				<Button variant="outline" href="/login">Log in</Button>
				<Button href="/signup">Sign up</Button>
			{/if}
		</div>
	</div>
</header>
<slot />
