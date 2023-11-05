<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Input } from '$lib/components/ui/input';
	import type { PageData } from './$types.js';
	import toast, { Toaster } from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms/client';
	import * as Dialog from '$lib/components/ui/dialog';

	export let data: PageData;
	const { form, enhance } = superForm(data.form);

	function handleSubmit() {
		let errors = Object.keys(data.form.errors).length;
		console.log(errors);
		console.log(data.form.valid);
		console.log(errors === 0 && data.form.valid);
		if (data.form.valid) {
			toast.success('Username was updated successfully');
		}
	}
</script>

<Toaster />

<form method="POST" action="?/updateAccount" use:enhance>
	<Label for="username">Username</Label>
	<Input type="text" name="username" class="my-2" bind:value={$form.username} />
	<p class="text-sm text-muted-foreground">This is your public display name.</p>
	<Button type="submit" on:click={handleSubmit} class="mt-5">Save</Button>
</form>

<div class="mt-6">
	<div><Label>Change password</Label></div>
	<Dialog.Root>
		<Dialog.Trigger><Button type="submit" variant="outline" class="mt-3">Change password</Button></Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Change your password?</Dialog.Title>
				<Dialog.Description>
					To change your password click the button below and we'll send you an email with a link to change your password.
				</Dialog.Description>
				<Dialog.Footer>
					<form method="post" action="?/resetPassword" use:enhance>
						<Button type="submit">Change password</Button>
					</form>
				</Dialog.Footer>
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>
</div>




