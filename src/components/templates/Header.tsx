import Link from 'next/link'
import Image from 'next/image'
import { ProfileServer } from '@/components/templates'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'

export default async function Header() {
	return (
		<header className="flex justify-between items-center mb-8 mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
			<h1 className="text-3xl">
				<Link href="/" className='flex flex-row gap-1 items-center font-medium'>
					<Image src="/logo.svg" alt='Logo' width={34} height={34} />
					StreakUp
				</Link>
			</h1>
			<Link
				className="border border-slate-300 text-slate-300 rounded px-2 py-1 hover:bg-slate-700 focus-within:bg-slate-700 outline-none flex gap-2"
				href="/new">
          <FontAwesomeIcon icon={faSquarePlus} className="w-4" /> New Habit
			</Link>

			<ProfileServer key='x' />
		</header>
	)
}
