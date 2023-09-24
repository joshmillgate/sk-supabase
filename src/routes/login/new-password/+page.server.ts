import { fail } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, locals: { supabase, getSession } }) => {
        const formData = await request.formData()
        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirmPassword') as string
        let newPassword;

        const session = await getSession();

        if (!session) {
            return fail(401, { message: 'Not Authorized.', success: false })
        }

        if (password === confirmPassword) {
            newPassword = password
        } else {
            return fail(400, {
                message: 'Passwords do not match',
                success: false,
            })
        }

        const { data: user, error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) {
            return fail(500, { message: 'Server error. Try again later.', success: false })
        }

        return {
            message: 'Success',
            success: true,
        }
    },
}