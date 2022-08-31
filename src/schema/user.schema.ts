import z from "zod";

export const createUserSchema = z.object({
	name: z.string(),
	email: z.string().email(),
});

// useless ??
export const createUserOutputSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string().email(),
});

export type CreateUserInputType = z.infer<typeof createUserSchema>;

export const requestOtpSchema = z.object({
	email: z.string().email(),
	redirect: z.string().default("/"),
});

export type RequestOtpInputType = z.infer<typeof requestOtpSchema>;

export const verifyOtpSchema = z.object({
	hash: z.string(),
});
