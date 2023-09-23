import { fail, type Actions } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';

export const actions = {
    default: async ({ request, url, locals: { supabase } }) => {
        const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const username = formData.get('username') as string
        const full_name = formData.get('full_name') as string

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { username, full_name },
                emailRedirectTo: `${url.origin}/auth/callback`,
            },
        })

        if (data.user && data.user.identities && data.user.identities.length === 0) {
            return fail(400, { success: false, message: "An account already exists with that email" })
        }

        if (error) {
            if (error instanceof AuthApiError && error.status == 400) {
                return fail(400, { message: 'Invalid email or password', success: false, email })
            }

            return fail(500, { message: 'Server error. Try again later.', success: false, email })
        }

        return {
            message: 'Please check your email for a magic link to log into the website.',
            success: true,
        }
    },
}