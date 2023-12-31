<script lang="ts">
	import '../app.postcss';
	import type { PageData } from './$types';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';

	import { LogOut, Settings, User, Moon, Sun } from 'lucide-svelte';

	export let data: PageData;

	let { supabase, session, profile } = data;
	$: ({ supabase, session, profile } = data);

	const { data: avatar_url } = supabase.storage.from('avatars').getPublicUrl(profile?.avatar_url);

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

	let dark: boolean;
	function toggleDark() {
		document.documentElement.classList.toggle('dark');
		if (document.documentElement.classList.contains('dark')) {
			dark = true;
		} else {
			dark = false;
		}
	}
</script>

<header
	class="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur flex justify-center mb-16	"
>
	<div class="flex h-16 items-center w-full max-w-2xl">
		<a href="/" class="mr-4 md:flex font-semibold tracking-tight text-xl">Serenade</a>
		<div class="flex flex-1 items-center space-x-2 sm:space-x-2 justify-end">
			<Button on:click={toggleDark} variant="outline" class="p-3 w-10 rounded-full justify-center">
				{#if dark == true}
					<Moon class="h-4 w-4" />
				{:else}
					<Sun class="h-4 w-4" />
				{/if}
			</Button>
			{#if session && profile }
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Avatar.Root>
							<Avatar.Image src={avatar_url.publicUrl} alt="@shadcn" />
							<Avatar.Fallback>JM</Avatar.Fallback>
						</Avatar.Root>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="w-56">
						<DropdownMenu.Group>
							<DropdownMenu.Item>
								<Avatar.Root class="w-5 h-5 mr-3">
									<Avatar.Image src={avatar_url.publicUrl} alt="@shadcn" />
									<Avatar.Fallback>JM</Avatar.Fallback>
								</Avatar.Root>
								{session.user.email}
							</DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.Item>
								<a href="/{profile?.username}" class="flex w-full">
									<User class="mr-2 h-4 w-4" />
									<span>Profile</span>
								</a>
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<a href="/settings/account" class="flex w-full">
									<Settings class="mr-2 h-4 w-4" />
									<span>Settings</span>
								</a>
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<form action="/logout" method="POST" class="flex w-full">
									<LogOut class="mr-2 h-4 w-4" />
									<button type="submit" class="w-full inline-flex">Log out</button>
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
<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">	 
<slot />
</div>
