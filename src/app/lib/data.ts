"use server";

import { prisma } from '@/db'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/lib/auth';

// Fetch all habits but limited to 20
export const fetchAllData = async () =>
{
	// Check if user is logged in
	const session = await getServerSession(authOptions);
	if (!session || !session.user)
		return null;

	const { user } = session;
	return await prisma.habits.findMany({
		where: {
			user: {
				id: user.id
			}
		},
		orderBy: {
			startDate: 'desc'
		},
		take: 20
	})
}