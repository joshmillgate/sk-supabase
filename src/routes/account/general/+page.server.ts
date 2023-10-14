import { fail, redirect } from '@sveltejs/kit'
import { message, superValidate } from 'sveltekit-superforms/server'
import { profileSchema } from './schema';


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

    const form = await superValidate(profile, profileSchema)

    return { form, session, profile }
}

export const actions = {
    updateProfile: async ({ request, locals: { supabase, getSession } }) => {
        const session = await getSession()
        const form = await superValidate(request, profileSchema)

        if (!form.valid) {
            return message(form, 'Invalid form');
            // return fail(400, {
            //     form
            // })
        }

        const full_name = form.data.full_name
        const website = form.data.website
        const username = form.data.username
        const avatar_url = form.data.avatar_url

        const { error } = await supabase.from('profiles').upsert({
            id: session?.user.id,
            full_name,
            website,
            username,
            avatar_url,
            updated_at: new Date(),
        })

        return message(form, 'Profile information updated!');
        // return { form, error }

    },
    signout: async ({ locals: { supabase, getSession } }) => {
        const session = await getSession()
        if (session) {
            await supabase.auth.signOut()
            throw redirect(303, '/')
        }
    },
}
