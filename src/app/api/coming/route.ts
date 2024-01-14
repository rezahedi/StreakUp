import { NextRequest } from 'next/server'
import { prisma } from '@/db'
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function GET(req: NextRequest) {

	const session = await getServerSession(authOptions);
	if (!session || !session.user) {
		return new Response(JSON.stringify({ message: "Unauthorized" }), {
			headers: { 'Content-Type': 'application/json' },
			status: 401
		})
	}
console.log('api session.user.id', session.user.id)
	let res = await prisma.habits.findMany({
		where: {
			user: {
				id: session.user.id
			},
			status: true,
			startDate: {
				gte: new Date()
			}
		},
		orderBy: {
			startDate: 'asc'
		}
	})

	let jsonResult = res.filter(habit => {
		let now = new Date()

		// TODO: include habits that created newly and never did the first checked-in,
		// They should be in coming habits but we can filter by startDate < now + 24 hours
		let next24Hours = new Date()
		next24Hours.setDate( next24Hours.getDate() + 1 )
		if ( habit.lastStreak === 0 && habit.startDate < next24Hours.getTime() ) return true

		// return habits that we are closer to startDate than to updatedAt, means they are coming for checkin
		return habit.startDate - now.getTime() < now.getTime() - habit.updatedAt
	})
	console.log('api json', jsonResult)

	return new Response(JSON.stringify(jsonResult), {
		headers: { 'Content-Type': 'application/json' },
		status: 200
	})
}
