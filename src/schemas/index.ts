import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z
  .object({
    email: z.string().email({
      message: "Email is required",
    }),
    name: z.string().min(1, {
      message: "Name is required",
    }),
    password: z.string().min(8, {
      message: "Minimum 8 characters required",
    }),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const NewPasswordSchema = z
  .object({
    password: z.string().min(8, {
      message: "Minimum 8 characters required",
    }),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    description: z.optional(
      z.string().max(50, { message: "Max number of characters is 50" }),
    ),
    enabledNotifications: z.optional(z.boolean()),
    password: z.optional(
      z
        .string()
        .min(8, { message: "Passowrd require minimum 8 characters" })
        .max(50, "Password is too long!"),
    ),
    newPassword: z.optional(
      z
        .string()
        .min(8, { message: "Passowrd require minimum 8 characters" })
        .max(50, "Password is too long!"),
    ),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    },
  );

export const BookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  description: z.optional(z.string()),
  publicationYear: z.optional(z.coerce.number()),
  publisher: z.optional(z.string()),
});

export const MessageSchema = z.object({
  message: z
    .string()
    .min(1, "Message is required")
    .max(100, "Message is too long!"),
});

export const AllowedFileExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
