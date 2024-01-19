import Link from 'next/link'
import Image from 'next/image'
import { Profile, ProfileServer } from '@/components/templates'
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";

export default async function Header() {
  const session = await getServerSession(authOptions);
	return (
		<header className="sticky left-0 right-0 top-0 z-20 border-b border-gray-200 bg-white">
			<div className='flex justify-between items-center mx-auto w-full max-w-screen-xl py-2 px-2.5 lg:px-20'>
				<h1 className="text-3xl">
					<Link href="/" className='flex flex-row gap-1 items-center font-medium'>
						<Image src="/logo.svg" alt='Logo' width={34} height={34} />
						StreakUp
					</Link>
				</h1>

				{!session || !session.user ? <ProfileServer /> : <Profile key='x' />}
			</div>
		</header>
	)
}
