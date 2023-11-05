import { fail } from '@sveltejs/kit'
import { message, superValidate } from 'sveltekit-superforms/server'
import { passwordSchema } from './schema';

export const actions = {
    default: async ({ request, locals: { supabase, getSession } }) => {
        const form = await superValidate(request, passwordSchema)

        console.log(form)

        // const session = await getSession()

        const { error } = await supabase.auth.updateUser({ password: form.data.newPassword })


        if (!form.valid) {
            // return message(form, 'Invalid form');
            return fail(400, {
                form
            })
        }

        return {
            form
        }
    }
}
