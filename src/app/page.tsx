import Link from 'next/link'
import { redirect } from 'next/navigation'
import { prisma } from '@/db'
import HabitItem from '@/components/HabitItem'
import DoneHabitItem from '@/components/DoneHabitItem'
import BrokenHabitItem from '@/components/BrokenHabitItem'
import ComingHabitItem from '@/components/ComingHabitItem'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from '@/components/templates/Header'
import { patternFormatChecker, getRepeatPatternObject, getStartEndDate } from '@/utils/dates'


async function checkinHabit (id: string) {
	'use server'

	// Get data by id
	let habit = await prisma.habits.findUnique({
		where: {
			id,
			// TODO: Get userId from session
			// userId: '34e3569f-2090-40ea-a519-28d28bc803e0'
		}
	})

	if( !habit ) {
		throw new Error('Habit not found')
	}

	if ( habit.repeatPattern.length === 0 || !patternFormatChecker( habit.repeatPattern ) )
		throw new Error('Habit repeat type Error');

	// Get pattern object
	let patternObj = getRepeatPatternObject( habit.repeatPattern )

	// calculate first checkin start/end dates
	const {startDate, endDate, lastLevel, streakIncrease} = getStartEndDate ( patternObj, habit.lastLevel + 1 )
	
	return await prisma.habits.update({
		where: {
			id,
			// TODO: Get userId from session
			// userId: '34e3569f-2090-40ea-a519-28d28bc803e0'
		},
		data: {
			startDate,
			endDate,
			lastLevel,
			streak: habit.streak + streakIncrease
		}
	})
}

async function activateHabit (id: string) {
	'use server'

	// Get data by id
	let habit = await prisma.habits.findUnique({
		where: {
			id,
			// userId: 'xxx'
		}
	})

	if( !habit ) {
		throw new Error('Habit not found')
	}

	if ( habit.repeatPattern.length === 0 || !patternFormatChecker( habit.repeatPattern ) )
		throw new Error('Habit repeat type Error');

	// Get pattern object
	let patternObj = getRepeatPatternObject( habit.repeatPattern )

	// calculate first checkin start/end dates
	const {startDate, endDate} = getStartEndDate ( patternObj, 0 )
		
	return await prisma.habits.update({
		where: {
			id,
			// userId: 'xxx'
		},
		data: {
			startDate,
			endDate,
			status: true,
		}
	})
}


// Get all active but missed check-in habits and update them as unactive and streak broken
async function updateHabits () {
	const records = await prisma.habits.findMany({
		where: {
			// TODO: Get userId from session
			userId: '34e3569f-2090-40ea-a519-28d28bc803e0',
			status: true,
			endDate: {
				lt: new Date()
			}
		}
	})
	
	
	records.forEach(async record => {
		let bestStreak = record.streak > record.lastStreak ? record.streak : record.lastStreak
		await prisma.habits.update({
			where: {
				id: record.id
			},
			data: {
				status: false,
				lastStreak: bestStreak,
				streak: 0,
				lastLevel: 0,
				startDate: null,
				endDate: null,
				streakBreaks: {
					increment: 1
				}
			}
		})
	})
}

function getHabits () {
	return prisma.habits.findMany({
		where: {
			userId: '34e3569f-2090-40ea-a519-28d28bc803e0',
			status: true,
			startDate: {
				lt: new Date()
			}
		},
		orderBy: {
			endDate: 'asc',
		},
	})
}

async function getComingHabits () {
	let res = await prisma.habits.findMany({
		where: {
			userId: '34e3569f-2090-40ea-a519-28d28bc803e0',
			status: true,
			startDate: {
				gte: new Date()
			}
		},
		orderBy: {
			startDate: 'asc'
		}
	})

	return res.filter(habit => {
		let now = new Date()

		// TODO: include habits that created newly and never did the first checked-in,
		// They should be in coming habits but we can filter by startDate < now + 24 hours
		let next24Hours = new Date()
		next24Hours.setDate( next24Hours.getDate() + 1 )
		if ( habit.lastStreak === 0 && habit.startDate < next24Hours.getTime() ) return true

		// return habits that we are closer to startDate than to updatedAt, means they are coming for checkin
		return habit.startDate - now.getTime() < now.getTime() - habit.updatedAt
	})
}

async function getDoneHabits () {
	let res = await prisma.habits.findMany({
		where: {
			userId: '34e3569f-2090-40ea-a519-28d28bc803e0',
			status: true,
			startDate: {
				gte: new Date()
			},
			// TODO: exclude habits that created newly and never did the first checked-in, they should be in coming habits
			lastStreak: {
				gt: 0
			},
			streakBreaks: {
				gt: 0
			}
		},
		orderBy: {
			updatedAt: 'desc'
		}
	})

	return res.filter(habit => {
		let now = new Date()
		// return habits that we are closer to updatedAt than to startDate, means they are checked-in recently
		return habit.startDate - now.getTime() >= now.getTime() - habit.updatedAt
	})
}

function getBrokenHabits () {
	return prisma.habits.findMany({
		where: {
			userId: '34e3569f-2090-40ea-a519-28d28bc803e0',
			status: false
		},
		orderBy: {
			updatedAt: 'desc'
		}
	})
}

export default async function Home() {
	
	// TODO: before getting list of habits, update all missed checkins
	await updateHabits();
	const habits = await getHabits()
	const comingHabits = await getComingHabits()
	const doneHabits = await getDoneHabits()
	const brokenHabits = await getBrokenHabits()

	return (
		<>
			<Header>
				<Link
					className="border border-slate-300 text-slate-300 rounded px-2 py-1 hover:bg-slate-700 focus-within:bg-slate-700 outline-none flex gap-2"
					href="/new">
						<FontAwesomeIcon icon={faSquarePlus} className='w-4' /> New Habit</Link>
			</Header>
			<h2 className="text-xl text-orange-500 border-b border-orange-500 pb-2 my-4">
				Need Check-in Now:
			</h2>
			{habits.length === 0 && <p className="text-center text-green-500 py-16">You are all set for now!</p>}
			<ul>
				{habits.map(habit => 
					<HabitItem key={habit.id} {...habit} checkinHabit={checkinHabit} />
				)}
			</ul>
			{comingHabits.length > 0 &&
				<>
					<h2 className="text-xl text-orange-500 border-b border-orange-500 pb-2 my-4">
						Upcoming:
					</h2>
					<ul>
						{comingHabits.map(habit =>
							<ComingHabitItem key={habit.id} {...habit} />
						)}
					</ul>
				</>
			}
			{doneHabits.length > 0 &&
				<>
					<h2 className="text-xl text-orange-500 border-b border-orange-500 pb-2 my-4">
						Done:
					</h2>
					<ul>
						{doneHabits.map(habit =>
							<DoneHabitItem key={habit.id} {...habit} />
						)}
					</ul>
				</>
			}
			{brokenHabits.length > 0 &&
				<>
					<h2 className="text-xl text-orange-500 border-b border-orange-500 pb-2 my-4">
						Broken:
					</h2>
					<ul>
						{brokenHabits.map(habit =>
							<BrokenHabitItem key={habit.id} {...habit} activateHabit={activateHabit} />
						)}
					</ul>
				</>
			}
		</>
	)
}
