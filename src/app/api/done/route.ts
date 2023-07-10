import { NextRequest } from 'next/server'
import { prisma } from '@/db'

export async function GET(req: NextRequest) {

	let res = await prisma.habits.findMany({
		where: {
			user: {
				id: '34e3569f-2090-40ea-a519-28d28bc803e0'
			},
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

	let jsonResult = res.filter(habit => {
		let now = new Date()
		// return habits that we are closer to updatedAt than to startDate, means they are checked-in recently
		return habit.startDate - now.getTime() >= now.getTime() - habit.updatedAt
	})

	return new Response(JSON.stringify(jsonResult), {
		headers: { 'Content-Type': 'application/json' },
		status: 200
	})
}
