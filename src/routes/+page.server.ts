export const load = async ({ locals: { supabase, getSession } }) => {
    const session = await getSession()

    const { data: profileList } = await supabase
        .from('profiles')
        .select()

    profileList?.forEach((profile) => {
        const avatarPublicUrl = supabase.storage.from('avatars').getPublicUrl(profile?.avatar_url).data.publicUrl
        profile.avatarPublicUrl = avatarPublicUrl
    })
    
    

    return { session, profileList }
}