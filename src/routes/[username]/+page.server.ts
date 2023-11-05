import { redirect } from '@sveltejs/kit';

export const load = async ({ params, locals: { supabase, getSession } }) => {
    const session = await getSession()

    if (!session) {
        throw redirect(303, '/')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select(`username, full_name, website, avatar_url, xcom, id`)
        .eq('username', params.username)
        .single()

    const { data: avatar_url } = await supabase
        .storage
        .from('avatars')
        .getPublicUrl(profile?.avatar_url)

    return { session, profile, avatar_url }
}