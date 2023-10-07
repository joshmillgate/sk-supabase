import { fail, redirect } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select(`username, full_name, website, avatar_url`)
        .eq('id', session.user.id)
        .single()

    return { session, profile }
}

export const actions = {
    updateAvatar: async ({ request, locals: { supabase, getSession } }) => {
        const formData = await request.formData()
        const avatarUrl = formData.get('avatarUrl') as string
        const session = await getSession()

        const { error } = await supabase.from('profiles').upsert({
            id: session?.user.id,
            avatar_url: avatarUrl,
            updated_at: new Date(),
        })

        if (error) {
            return fail(500, {
                error,
                success: false,
                message: 'Server error. Try again later.',
                avatarUrl,
            })
        }

        return {
            success: true,
            message: 'Account info successfully updated',
            avatarUrl,
        }
    },
    updateWebsite: async ({ request, locals: { supabase, getSession } }) => {
        const formData = await request.formData()
        const website = formData.get('website') as string
        const session = await getSession()

        const { error } = await supabase.from('profiles').upsert({
            id: session?.user.id,
            website,
            updated_at: new Date(),
        })

        if (error) {
            return fail(500, {
                error,
                success: false,
                message: 'Server error. Try again later.',
                website
            })
        }

        return {
            success: true,
            message: 'Website successfully updated',
            website
        }
    },
    updateName: async ({ request, locals: { supabase, getSession } }) => {
        const formData = await request.formData()
        const fullName = formData.get('fullName') as string
        const session = await getSession()

        const { error } = await supabase.from('profiles').upsert({
            id: session?.user.id,
            fullName,
            updated_at: new Date(),
        })

        if (error) {
            return fail(500, {
                error,
                success: false,
                message: 'Server error. Try again later.',
                fullName
            })
        }

        return {
            success: true,
            message: 'Name successfully updated',
            fullName
        }
    },
    updateUsername: async ({ request, locals: { supabase, getSession } }) => {
        const formData = await request.formData()
        const username = formData.get('username') as string
        const session = await getSession()

        const { error } = await supabase.from('profiles').upsert({
            id: session?.user.id,
            username,
            updated_at: new Date(),
        })

        if (error) {
            return fail(500, {
                error,
                success: false,
                message: 'Server error. Try again later.',
                username
            })
        }

        return {
            success: true,
            message: 'Username successfully updated',
            username
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
