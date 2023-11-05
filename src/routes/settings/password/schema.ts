import { z } from "zod";

export const passwordSchema = z.object({
    currentPassword: z.string().min(2).max(18),
    newPassword: z.string().min(2).max(18),
    confirmNewPassword: z.string().min(2).max(18)
})

export type PasswordSchema = typeof passwordSchema;