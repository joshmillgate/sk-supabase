import { z } from "zod";

export const profileSchema = z.object({
    full_name: z.string().min(2),
    username: z.string().min(2).max(18),
    website: z.string(),
    avatar_url: z.string(),
    xcom: z.string()
})

export type ProfileSchema = typeof profileSchema;