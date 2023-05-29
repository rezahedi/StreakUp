import Link from 'next/link'
import { prisma } from '@/db'
import { HabitItem } from '@/components/HabitItem'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function getHabits () {
	return prisma.habits.findMany()
}

export default async function Home() {
	
	const habits = await getHabits()

	return (
		<>
			<header className="flex justify-between items-center mb-8">
			<h1 className="text-3xl">StreakUp</h1>
			<Link
				className="border border-slate-300 text-slate-300 rounded px-2 py-1 hover:bg-slate-700 focus-within:bg-slate-700 outline-none flex gap-2"
				href="/new">
					<FontAwesomeIcon icon={faSquarePlus} className='w-4' /> New Habit</Link>
			</header>
			<h2 className="text-xl text-orange-500 border-b border-orange-500 pb-2 my-4">Need Check-in Today:</h2>
			<ul>
				{habits.map(habit => 
					<HabitItem key={habit.id} {...habit} />
				)}
			</ul>
			<h2 className="text-xl text-orange-500 border-b border-orange-500 pb-2 my-4">Upcoming Check-in:</h2>
			<ul>
				<HabitItem key={1} id='1' name='Fake Meditate 10 minutes' habitType='Every day' streak={3} createdAt={new Date()} />
				<HabitItem key={2} id='2' name='Fake Go for a walk' habitType='Three times a week' streak={1} createdAt={new Date()} />
			</ul>
			<h2 className="text-xl text-orange-500 border-b border-orange-500 pb-2 my-4">Done:</h2>
			<ul>
				<li className="flex gap-1 items-center">
					<input id="5" type="checkbox" checked className="cursor-pointer" />
					<label htmlFor="5" className="line-through cursor-pointer">Wokeup at 6am</label>
				</li>
				<li className="flex gap-1 items-center">
					<input id="6" type="checkbox" checked className="cursor-pointer" />
					<label htmlFor="6" className="line-through cursor-pointer">Listen to a podcast</label>
				</li>
			</ul>
		</>
	)
}
