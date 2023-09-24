<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import * as Alert from '$lib/components/ui/alert';
	import { Check, AlertCircle } from 'lucide-svelte';
	import type { PageData } from './$types.js';
	export let form;
</script>

<div class="sm:mx-auto mt-60 max-w-xs">
	<Card.Root>
		<Card.Header>
			<Card.Title tag="h2">Reset password</Card.Title>
			<Card.Description>Enter your email address below and we'll send a password reset email</Card.Description>
		</Card.Header>
		<Card.Content>
				<form method="post" use:enhance>
					<div class="flex flex-col w-full max-w-sm gap-3">
						<div class="flex flex-col w-full max-w-sm">
							<Input
								type="email"
								id="email"
								name="email"
								placeholder="Email"
							/>
						</div>
					</div>
					<Button class="w-full mt-6">Send reset password email</Button>
					<Button class="w-full mt-2" variant="ghost" href="/login">← back to log in</Button>
				</form>
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
