import NextAuth, { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  isOAuth: boolean;
  enabledNotifications: boolean;
  description: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
