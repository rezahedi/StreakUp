import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

if (
  !process.env.GITHUB_CLIENT_ID ||
  !process.env.GITHUB_SECRET_ID ||
  !process.env.GOOGLE_CLIENT_ID ||
  !process.env.GOOGLE_SECRET_ID ||
  !process.env.NEXTAUTH_SECRET
) {
  throw new Error("Auth required env variables are not set");
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET_ID,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };