import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client";
import EmailProvider, { SendVerificationRequestParams } from "next-auth/providers/email";
import { Resend } from 'resend';

if (
  !process.env.GITHUB_CLIENT_ID ||
  !process.env.GITHUB_SECRET_ID ||
  !process.env.GOOGLE_CLIENT_ID ||
  !process.env.GOOGLE_SECRET_ID
) {
  throw new Error("Auth required env variables are not set");
}

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET_ID,
    }),
    EmailProvider({
      server: '',
      from: 'noreply@rezahedi.dev',
      sendVerificationRequest : async ( params: SendVerificationRequestParams ) => {
        let { identifier, url, provider } = params;
        try {
          let resend = new Resend(process.env.RESEND_API_KEY!)
          await resend.emails.send({
            from: provider.from,
            to: identifier,
            subject: 'Your StreakUp Login Link',
            html: '<html><body>\
              <h2>Your Login Link</h2>\
              <p>Welcome to StreakUp!</p>\
              <p>Please click the magic link below to sign in to your account.</p>\
              <p><a href="' + url + '"><b>Sign in</b></a></p>\
              <p>or copy and paste this URL into your browser:</p>\
              <p><a href="' + url + '">' + url + '</a></p>\
              <br /><br /><hr />\
              <p><i>This email was intended for ' + identifier + '. If you were not expecting this email, you can ignore this email.</i></p>\
              </body></html>',
          });
        } catch (error) {
          console.log({ error });
        }
      },
    }),
    
  ],
  debug: process.env.NODE_ENV === "development",
  
  callbacks: {
    session({user, session}) {
      if (session.user) {
        session.user.id = user.id;
      }

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
