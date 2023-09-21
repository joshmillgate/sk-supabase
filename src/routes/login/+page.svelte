<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import * as Alert from '$lib/components/ui/alert';
	import { Check, AlertCircle, Eye, EyeOff } from 'lucide-svelte';
	import type { PageData } from './$types.js';
	export let form;

	export let data: PageData;

	let type = 'password';
	let showPassword = () => {
		if (type == 'password') {
			type = 'text';
		} else {
			type = 'password';
		}
	};
</script>

<div class="sm:mx-auto mt-60 max-w-xs">
	<Card.Root>
		<Card.Header>
			<Card.Title tag="h2">Log in</Card.Title>
			<Card.Description>Let's create something awesome</Card.Description>
		</Card.Header>
		<Card.Content>
			{#if data.session}
				<p>Welcome, {data.session.user.email}</p>
				<form action="/logout" method="POST">
					<button type="submit" class="btn btn-primary">Log out</button>
				</form>
			{:else}
				<form method="post" use:enhance>
					<div class="flex flex-col w-full max-w-sm gap-3">
						<div class="flex flex-col w-full max-w-sm">
							<Input
								type="email"
								id="email"
								name="email"
								placeholder="Email"
								value={form?.email ?? ''}
							/>
						</div>
						<div class="flex flex-col w-full max-w-sm">
							<div class="flex relative">
								<Input id="password" name="password" placeholder="Password" {type} required />
								<Button
									type="button"
									on:click={showPassword}
									variant="ghost"
									class="px-3 absolute right-0 rounded-l-none border-l"
								>
									{#if type == 'password'}
										<Eye class="w-4 h-4" />
									{:else}
										<EyeOff class="w-4 h-4" />
									{/if}
								</Button>
							</div>
							<div class="text-xs flex gap-2 items-center justify-center text-center mt-3">
								<a href="" class="">Forgot password?</a>
							</div>
						</div>
					</div>
					<Button class="w-full mt-6">Log in</Button>
					<Button class="w-full mt-2" variant="outline" href="/signup"
						>No Account? Sign up</Button
					>
				</form>
			{/if}
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
		</Card.Content>
	</Card.Root>
</div>
