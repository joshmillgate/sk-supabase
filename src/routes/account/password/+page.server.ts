import { fail, redirect } from '@sveltejs/kit'

export const actions = {
    updatePassword: async ({ request, locals: { supabase, getSession } }) => {
        const formData = await request.formData()
        const newPassword = formData.get('newPassword') as string

        const session = await getSession()

        const { error } = await supabase.auth.updateUser({ password: newPassword })

        if (error) {
            return fail(500, {
                error,
                success: false,
                message: 'Server error. Try again later.'
            })
        }

        return {
            success: true,
            message: 'Password successfully updated'
        }
    },
    signout: async ({ locals: { supabase, getSession } }) => {
        const session = await getSession()
        if (session) {
            await supabase.auth.signOut()
            throw redirect(303, '/')
        }
    },
}
