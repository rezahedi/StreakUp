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

	const habits = await prisma.habits.findMany({
		where: {
			user: {
				id: session.user.id
			},
			status: true,
			startDate: {
				lt: new Date()
			}
		},
		orderBy: {
			endDate: 'asc',
		},
	})

	return new Response(JSON.stringify(habits), {
		headers: { 'Content-Type': 'application/json' },
		status: 200
	})
}
