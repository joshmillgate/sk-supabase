import { fail, redirect } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';

export const actions = {
    default: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData()
        const email = formData.get('email') as string


        const { data, error } = await supabase.auth
            .resetPasswordForEmail(email, {
                redirectTo: "http://localhost:5137/login/new-password"
            })

        if (error) {
            if (error instanceof AuthApiError && error.status === 400) {
                return fail(400, {
                    message: 'Email or password is incorrect',
                    success: false,
                    email
                })
            }

            return fail(500, { message: 'Server error. Try again later.', success: false, email })
        }

        throw redirect(303, '/')

        return {
            message: 'Success',
            success: true,
        }
    },
}