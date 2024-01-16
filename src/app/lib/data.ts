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
				lt: new Date()
			}
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
  let result = await prisma.habits.findMany({
		where: {
			user: {
				id: user.id
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

  // Filter the result data
  return result.filter(habit => {
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

export const fetchDoneData = async () =>
{
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Check if user is logged in
  const session = await getServerSession(authOptions);
  if (!session || !session.user)
    return null;

  const { user } = session;
  let result = await prisma.habits.findMany({
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

  return result.filter(habit => {
		let now = new Date()
		// return habits that we are closer to updatedAt than to startDate, means they are checked-in recently
		return habit.startDate - now.getTime() >= now.getTime() - habit.updatedAt
	})
}