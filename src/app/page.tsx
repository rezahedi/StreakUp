import Link from 'next/link'
import { prisma } from '@/db'

function getHabits () {
	return prisma.habits.findMany()
}

export default async function Home() {
	
	const habits = await getHabits()

	return (
		<>
			<header className="flex justify-between items-center mb-4">
			<h1 className="text-2xl">StreakUp</h1>
			<Link
				className="border border-slate-300 text-slate-300 rounded-md px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
				href="/new">New Habit</Link>
			</header>
			<ul>
				{habits.map(h=><li key={h.id}>{h.name}</li>)}
			</ul>
		</>
	)
}
