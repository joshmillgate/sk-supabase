import { fail, redirect } from '@sveltejs/kit'
import { message, superValidate } from 'sveltekit-superforms/server'
import { z } from "zod";

const accountSchema = z.object({
    username: z.string().min(2).max(18)
})

export const load = async ({ locals: { supabase, getSession }, request }) => {
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select(`username, full_name, website, avatar_url`)
        .eq('id', session.user.id)
        .single()

    const form = await superValidate(profile, accountSchema)

    return { form, session, profile }
}

export const actions = {
    updateAccount: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession()
        const form = await superValidate(request, accountSchema)

        if (!form.valid) {
            // return message(form, 'Invalid form');
            return fail(400, {
                form
            })
        }
        const username = form.data.username

        const { error } = await supabase.from('profiles').upsert({
            id: session?.user.id,
            username,
            updated_at: new Date(),
        })

        return message(form, 'Account information updated!');
        // return { form, error }

    },
    resetPassword: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession()
        const email = session?.user.email?.toString()

        if (email) {
            // const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            //     redirectTo: '/settings/password'
            // })

            // if (data) {
            //     console.log(data)
            // }
            // if (!error) {
            //     return { success: true } 
            // }
            return { message: 'Check your email', success: true } 
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