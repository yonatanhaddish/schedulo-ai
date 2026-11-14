import { z } from "zod";

const emailField = z
  .string()
  .trim()
  .email("Enter a valid email address.")
  .max(254, "Email address is too long.");

export const signUpSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters.")
    .max(80, "Name must contain 80 characters or fewer."),
  email: emailField,
  password: z
    .string()
    .min(8, "Password must contain at least 8 characters.")
    .max(128, "Password must contain 128 characters or fewer.")
    .regex(/[A-Za-z]/, "Password must contain at least one letter.")
    .regex(/[0-9]/, "Password must contain at least one number."),
});

export const signInSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Enter your password."),
});

export const passwordResetRequestSchema = z.object({
  email: emailField,
});

export const passwordUpdateSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must contain at least 8 characters.")
      .max(128, "Password must contain 128 characters or fewer.")
      .regex(/[A-Za-z]/, "Password must contain at least one letter.")
      .regex(/[0-9]/, "Password must contain at least one number."),
    confirmPassword: z.string().min(1, "Confirm your new password."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters.")
    .max(80, "Name must contain 80 characters or fewer."),
});
