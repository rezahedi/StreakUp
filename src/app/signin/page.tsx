import { getProviders } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/lib/auth"
import { redirect } from "next/navigation"
import { SignInButton } from "@/app/ui/auth"
import { Google, Github } from "@/app/ui/icons"
import Image from 'next/image'
import EmailForm from "./EmailForm"

export default async function Page() {
  const session = await getServerSession(authOptions)
  if (session)
    redirect("/dashboard")

  // In Vercel getProviders() didn't work on and had error, so after some research
  // I found that NEXTAUTH_URL env variable should be set in Vercel.
  const providers = await getProviders()

  return (
    <div className="flex justify-center">
      <div className="mt-[calc(15vh)] h-fit w-full sm:max-w-md overflow-hidden border-y border-gray-200 sm:rounded-2xl sm:border sm:shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <a href="https://streakup.vercel.app">
            <Image src="/logo.png" width="80" height="80" className="w-16" alt="StreakUp Logo" />
          </a>
          <h3 className="text-xl font-semibold">Sign in to StreakUp</h3>
          <p className="text-sm text-gray-500">Start building your new habits here.</p>
        </div>
        <div className="flex flex-col space-y-3 bg-gray-50 px-4 py-10 sm:px-16">
          <SignInButton providerId="google">
            <Google className="w-4 h-4" />
            <p>Sign in with Google</p>
          </SignInButton>
          <SignInButton providerId="github">
            <Github className="w-4 h-4" />
            <p>Sign in with Github</p>
          </SignInButton>
          <div className="mb-4 mt-1 border-t border-gray-300" />
          <EmailForm />
        </div>
      </div>
    </div>
  )
}
