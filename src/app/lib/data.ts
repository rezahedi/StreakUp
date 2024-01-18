import { prisma } from '@/db'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const fetchTodayData = async () =>
{
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Check if user is logged in
  const session = await getServerSession(authOptions);
	if (!session || !session.user)
    return null;

  const { user } = session;
	return await prisma.habits.findMany({
		where: {
			user: {
				id: user.id
			},
			status: true,
			startDate: {
				lte: new Date()
			},
			endDate: {
				gte: new Date()
			},
		},
		orderBy: {
			endDate: 'asc',
		},
	})
}

export const fetchTomorrowData = async () =>
{
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Check if user is logged in
  const session = await getServerSession(authOptions);
	if (!session || !session.user)
    return null;

  const { user } = session;
	let now = new Date()

  return await prisma.habits.findMany({
		where: {
			user: {
				id: user.id
			},
			status: true,
			startDate: {
				gte: now,
			},
		},
		orderBy: {
			startDate: 'asc'
		}
	})
}

export const fetchBrokenData = async () =>
{
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Check if user is logged in
  const session = await getServerSession(authOptions);
  if (!session || !session.user)
    return null;

  const { user } = session;
	return await prisma.habits.findMany({
		where: {
			user: {
				id: user.id
			},
			status: false
		},
		orderBy: {
			updatedAt: 'desc'
		}
	})
}
