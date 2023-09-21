import { redirect } from '@sveltejs/kit'

export const load = async ({ params, locals: { supabase, getSession } }) => {
    const session = await getSession()

    console.log(params.username)

    if (!session) {
        throw redirect(303, '/')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select(`username, full_name, website, avatar_url`)
        .eq('username', params.username)
        .single()

    return { session, profile }
}