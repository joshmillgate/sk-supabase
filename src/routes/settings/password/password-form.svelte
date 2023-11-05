<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { passwordSchema, type PasswordSchema } from './schema';
	import type { SuperValidated } from 'sveltekit-superforms';
	export let form: SuperValidated<PasswordSchema>;
</script>

<Form.Root method="POST" {form} schema={passwordSchema} let:config>
	<Form.Field {config} name="currentPassword">
		<Form.Item>
			<Form.Label>Current Password</Form.Label>
			<Form.Input type="password" />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="newPassword">
		<Form.Item>
			<Form.Label>New Password</Form.Label>
			<Form.Input type="password" />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="confirmNewPassword">
		<Form.Item>
			<Form.Label>Confirm new Password</Form.Label>
			<Form.Input type="password"/>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Button class="mt-5">Save</Form.Button>
</Form.Root>
