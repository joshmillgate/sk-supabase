export const load = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()

    const { data: profileList } = await supabase
        .from('profiles')
        .select()

    return { session, profileList }
}