'use client'

import { signIn } from "next-auth/react"

export default function SignInButton( {providerId, children}: {providerId: string, children: React.ReactNode} ) {
  return (
    <button className="flex h-10 w-full items-center justify-center space-x-2 rounded-md border px-4 text-sm transition-all focus:outline-none border-black bg-black text-white hover:bg-white hover:text-black" onClick={() => signIn(providerId)}>
      {children}
    </button>
  )
}
