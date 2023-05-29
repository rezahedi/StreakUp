import Link from 'next/link'
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { prisma } from '@/db'
import { redirect } from 'next/navigation'

async function createHabit (data: FormData) {
	'use server'

	let habitName = data.get('habitName')?.valueOf()
	let habitType = data.get('habitType')?.valueOf()

	if(typeof habitName !== 'string' || habitName.length === 0)
		throw new Error('Habit name Error');
	if(typeof habitType !== 'string' || habitType.length === 0)
		throw new Error('Habit type Error');
	
	await prisma.habits.create({
		data: {
			name: habitName,
			habitType: habitType,
			// TODO: Get userId from session
			userId: '34e3569f-2090-40ea-a519-28d28bc803e0'
		}
	})

	redirect('/')
}

export default function Home() {
	return (
		<>
			<header className="flex justify-between items-center mb-8">
				<h1 className="text-3xl">StreakUp</h1>
				<Link
					className="border border-slate-300 text-slate-300 rounded px-2 py-1 hover:bg-slate-700 focus-within:bg-slate-700 outline-none flex gap-2"
					href="..">
						<FontAwesomeIcon icon={faArrowAltCircleLeft} className='w-4' /> Back</Link>
			</header>
			<h2 className="text-xl text-orange-500 border-b border-orange-500 pb-2 my-4">New Habit:</h2>
			<form action={createHabit} className="flex flex-col gap-4">
				<label htmlFor="name" className="text-slate-400 text-xs">Name</label>
				<input id="name" name="habitName" type="text" className="border border-slate-300 rounded px-2 py-1 outline-none text-slate-800" placeholder='Example: Read books for 30 min' />
				<label htmlFor="habitType" className="text-slate-400 text-xs">Habit Type</label>
				<select id="habitType" name="habitType" className="border border-slate-300 rounded px-2 py-1 outline-none text-slate-800">
					<option value="Everyday">Every day</option>
					<option value="Weekdays">Twice a week</option>
					<option value="Weekends">Every Weekends</option>
					<option value="Custom">Custom</option>
				</select>
				<div className='flex justify-end gap-2'>
					<button type="submit" className="border border-slate-300 text-slate-300 rounded px-2 py-1 hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Create</button>
					<Link href=".." className='border border-slate-300 text-slate-300 rounded px-2 py-1 hover:bg-slate-700 focus-within:bg-slate-700 outline-none'>Cancel</Link>
				</div>
			</form>
		</>
	)
}