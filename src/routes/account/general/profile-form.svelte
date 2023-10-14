<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import Avatar from './Avatar.svelte';
	import { profileSchema, type ProfileSchema } from './schema';
	import type { SuperValidated } from 'sveltekit-superforms';
	export let form: SuperValidated<ProfileSchema>;
	import type { PageData } from './$types.js';

	export let data: PageData;

	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);

	interface MyForm extends SuperValidated<ProfileSchema> {
    requestSubmit: () => void;
}

// export let form2: MyForm;
</script>

<Form.Root method="POST" {form} action="?/updateProfile" schema={profileSchema} let:config>
	<Form.Field {config} name="website">
		<Form.Item>
			<Form.Label>Website</Form.Label>
			<Avatar
				{supabase}
				bind:url={$form.avatar_url}
				size={5}
				on:upload={() => {
					form.requestSubmit();
				}}
			/>
			<Form.Description>This is your public display name.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="username">
		<Form.Item>
			<Form.Label>Username</Form.Label>
			<Form.Input />
			<Form.Description>This is your public display name.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="full_name">
		<Form.Item>
			<Form.Label>Full name</Form.Label>
			<Form.Input />
			<Form.Description>This is your public display name.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="website">
		<Form.Item>
			<Form.Label>Website</Form.Label>
			<Form.Input />
			<Form.Description>This is your public display name.</Form.Description>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</Form.Root>
