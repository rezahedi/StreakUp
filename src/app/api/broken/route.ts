import { NextRequest } from 'next/server'
import { prisma } from '@/db'

export async function GET(req: NextRequest) {

	const habits = await prisma.habits.findMany({
		where: {
			user: {
				id: '34e3569f-2090-40ea-a519-28d28bc803e0'
			},
			status: false
		},
		orderBy: {
			updatedAt: 'desc'
		}
	})

	return new Response(JSON.stringify(habits), {
		headers: { 'Content-Type': 'application/json' },
		status: 200
	})
}
