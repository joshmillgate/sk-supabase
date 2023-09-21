<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import * as Alert from '$lib/components/ui/alert';
	import { Check, AlertCircle, Eye, EyeOff } from 'lucide-svelte';
	export let form;

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
			<Card.Title tag="h2">Sign up</Card.Title>
			<Card.Description>Create an account to get started</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="post" use:enhance>
				<div class="flex flex-col w-full gap-3">
					<div class="flex flex-col w-full">
						<Input
							id="email"
							name="email"
							placeholder="Email"
							type="email"
							value={form?.email ?? ''}
						/>
					</div>
					<div class="flex flex-col w-full">
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
					</div>
				</div>
				<Button type="submit" class="w-full mt-6">Sign up</Button>
				<Button class="w-full mt-2" variant="outline" href="/login"
					>Already have an account? Log in</Button
				>
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
		</Card.Content>
	</Card.Root>
</div>
