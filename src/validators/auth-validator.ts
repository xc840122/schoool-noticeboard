import { z } from "zod";

// Verify the Signup
export const SignUpValidator = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(16, 'Username must be at most 16 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  classroom: z.string()
    .max(4, 'Classroom code must be at most 4 characters')
    .regex(/^[a-zA-Z0-9]+$/, 'Classroom code must contain only letters and numbers'),
  verificationCode: z.string().regex(/^[a-zA-Z0-9]{6}$/, 'Must be a 6-digit alphanumeric ID'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SignUpType = z.infer<typeof SignUpValidator>;