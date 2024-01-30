import Link from 'next/link'

export default function Hero({ loggedIn = false }: { loggedIn?: boolean }) {
  return (
    <div className="flex flex-col gap-5 py-12 px-2.5 sm:px-0">
      <h1 className="font-display text-4xl font-bold leading-[1.15] text-black sm:text-6xl sm:leading-[1.15]">
        Build Habits With<br />
        <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">StreakUp</span>
      </h1>
      <h2 className="text-gray-600 sm:text-xl">StreakUp is the open-source habit management application for modern people who want to build a lifestyle that lasts.</h2>
      <div className="mx-auto space-x-4">
        {loggedIn &&
          <Link href="/dashboard" className="rounded-full border border-black bg-black px-5 py-2 text-sm text-white shadow-lg transition-all hover:bg-white hover:text-black">Go to Dashboard</Link>
        }
        {!loggedIn &&
          <Link href="/auth/signin" className="rounded-full border border-black bg-black px-5 py-2 text-sm text-white shadow-lg transition-all hover:bg-white hover:text-black">Start Building</Link>
        }
      </div>
    </div>
  )
}
