<script lang="ts">
	import type { PageData } from './$types';
	import * as Avatar from '$lib/components/ui/avatar';
	export let data: PageData;

	let { supabase, session, profile } = data;
	$: ({ supabase, session, profile } = data);

	console.log(profile);

	const { data: avatarUrl } = supabase.storage.from('avatars').getPublicUrl(profile?.avatar_url);
</script>

{#if !profile?.username}
	<h2>This profile does not exist</h2>
{:else}
	<Avatar.Root class="w-20 h-20 mr-3">
		<Avatar.Image src={avatarUrl.publicUrl} alt="@shadcn" />
		<Avatar.Fallback>JM</Avatar.Fallback>
	</Avatar.Root>
	<div class="mt-4">
		<h1 class="text-xl font-semibold">{profile.full_name}</h1>
		<h2>@{profile?.username}</h2>
	</div>
{/if}
