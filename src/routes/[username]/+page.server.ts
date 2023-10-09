import { redirect, fail, type Actions } from '@sveltejs/kit'

export const load = async ({ params, locals: { supabase, getSession } }) => {
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select(`username, full_name, website, avatar_url, id`)
        .eq('username', params.username)
        .single()

    return { session, profile }
}

export const actions = {
    default: async ({ request, locals: { supabase, getSession } }) => {
        const formData = await request.formData()
        const full_name = formData.get('full_name') as string
        const username = formData.get('username') as string
        const website = formData.get('website') as string

        const session = await getSession()

        const { error } = await supabase.from('profiles').upsert({
            id: session?.user.id,
            full_name: full_name,
            username,
            website,
            updated_at: new Date(),
        })

        if (error) {
            return fail(500, {
                error,
                success: false,
                message: 'Server error. Try again later.',
                full_name,
                username,
                website,
            })
        }

        return {
            success: true,
            message: 'Account info successfully updated',
            full_name,
            username,
            website,
        }
    }
}
