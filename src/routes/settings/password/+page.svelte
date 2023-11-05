<script lang="ts">
	import type { PageData } from './$types.js';
	import PasswordForm from './password-form.svelte';

	export let data: PageData;
</script>
<PasswordForm form={data.form} />
<!-- <form method="post" action="?/updatePassword" use:enhance={handleSubmit} bind:this={profileForm}>
	<Fieldset title="Password">
		<p slot="subtitle" class="my-3">
			Update your password below.
		</p>
		<Input
				name="currentPassword"
				id="currentPassword"
				type="password"
				placeholder="Current Password"
				class="mb-2"
			/>
			<Input name="newPassword" id="newPassword" type="password" placeholder="New Password" />
		<p slot="statusText">We will email you to verify the change.</p>
		<div slot="footerActions">
			<Button type="submit" disabled={loading} size="sm" class="ml-auto font-normal"
				>{#if loading}
					<Loader2 class="animate-spin h-4 w-4" />
				{:else}
					Save
				{/if}</Button
			>
		</div>
	</Fieldset>
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
</form> -->
