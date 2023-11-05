<script lang="ts">
	import type { PageData } from './$types.js';
	export let data: PageData;

	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Avatar from '$lib/components/ui/avatar';

	let { supabase, session, profileList } = data;
	$: ({ supabase, session, profileList } = data);
</script>

{#if data.session}
	<h1 class="text-6xl mb-6">Welcome back,<br /> {data.session.user.email}</h1>
	<div class="flex">
		<Input
			type="post"
			id="post"
			name="post"
			placeholder="What's new?"
			class="rounded-r-none"
		/><Button class="w-24 rounded-l-none">Post</Button>
	</div>
	<div class="mt-6 border-t pt-6">
		<h3 class="font-medium text-xl mb-4">People you might find interesting:</h3>
		{#each profileList || [] as profile}
			{#if profile.id !== data.session.user.id}
				<Button href="/{profile.username}" variant="outline"
					class="p-6 pl-4 pr-5 border flex items-center justify-between rounded-md mb-2 w-full group hover:ease-in">
						<div class="flex items-center">
							{#key profile.avatarPublicUrl}
								<Avatar.Root class="w-8 h-8 mr-3">
									<Avatar.Image src={profile.avatarPublicUrl} alt="@shadcn" />
									<Avatar.Fallback>XX</Avatar.Fallback>
								</Avatar.Root>
							{/key}
							<p class="text-md">{profile.full_name}</p>
						</div>
						<p class="group-hover:translate-x-1 transition duration-150 ease-out hover:ease-in">→</p>
				</Button>
			{/if}
		{/each}
	</div>
{:else}
	<div class="text-center mt-24 flex flex-col items-center">
		<h1 class="text-6xl tracking-tighter font-semibold mb-4">
			Serenade is a pretty awesome SvelteKit starter kit.
		</h1>
		<p class="text-lg text-slate-500 mb-4">Built using shadcn-svelte, typescript and supabase.</p>
		<div class="flex gap-2">
			<Button href="/login">Get Started</Button>
			<Button variant="outline" href="/login">View demo</Button>
		</div>
	</div>
{/if}
