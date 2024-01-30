import { getProviders } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/lib/auth"
import { redirect } from "next/navigation"
import { SignInButton } from "@/app/ui/auth"
import { Google, Github } from "@/app/ui/icons"
import Image from 'next/image'

export default async function SignIn() {
  const session = await getServerSession(authOptions)
  if (session)
    redirect("/dashboard")
  const providers = await getProviders() ?? []

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
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <SignInButton providerId={provider.id}>
                {provider.id === "google" && <Google className="w-4 h-4" />}
                {provider.id === "github" && <Github className="w-4 h-4" />}
                <p>Sign in with {provider.name}</p>
              </SignInButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
