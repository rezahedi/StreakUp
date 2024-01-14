import { NextRequest } from 'next/server'
import { prisma } from '@/db'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: NextRequest) {

	const session = await getServerSession(authOptions);
	if (!session || !session.user) {
		return new Response(JSON.stringify({ message: "Unauthorized" }), {
			headers: { 'Content-Type': 'application/json' },
			status: 401
		})
	}

	let res = await prisma.habits.findMany({
		where: {
			user: {
				id: session.user.id
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
