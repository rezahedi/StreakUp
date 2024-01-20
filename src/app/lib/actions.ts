"use server";

import {prisma} from "@/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import {
  patternFormatChecker,
  getRepeatPatternObject,
  getStartEndDate,
} from "@/utils/dates";
import { CustomUser } from "@/type";
import { sanitizeString } from "@/utils/sanitize";

/**
 * Update habit status as checked-in
 **/
export async function checkinHabit(id: string)
{
  const session = await getServerSession(authOptions);
  if (!session || !session.user)
    throw new Error("User not logged in");

  // Get data by id
  let habit = await prisma.habits.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  });

  if (!habit) {
    throw new Error("Habit not found");
  }

  if (
    habit.repeatPattern.length === 0 ||
    !patternFormatChecker(habit.repeatPattern)
  )
    throw new Error("Habit repeat type Error");

  // Get pattern object
  let patternObj = getRepeatPatternObject(habit.repeatPattern);

  // calculate first checkin start/end dates
  const {startDate, endDate, lastLevel, streakIncrease} = getStartEndDate(
    patternObj,
    habit.lastLevel + 1
  );

  return await prisma.habits.update({
    where: {
      id,
    },
    data: {
      startDate,
      endDate,
      lastLevel,
      streak: habit.streak + streakIncrease,
    },
  });
}

/**
 * Update habit status as skipped
 */
export async function updateHabits(user: CustomUser) {

  const records = await prisma.habits.findMany({
    where: {
      userId: user.id,
      status: true,
      endDate: {
        lt: new Date(),
      },
    },
  });

  records.forEach(async (record) => {
    let bestStreak =
      record.streak > record.lastStreak ? record.streak : record.lastStreak;
    await prisma.habits.update({
      where: {
        id: record.id,
      },
      data: {
        status: false,
        lastStreak: bestStreak,
        streak: 0,
        lastLevel: 0,
        startDate: null,
        endDate: null,
        streakBreaks: {
          increment: 1,
        },
      },
    });
  });
}

/**
 * Activate broken habit
 */
export async function activateHabit(id: string) {

  const session = await getServerSession(authOptions);
  if (!session || !session.user)
    throw new Error("User not logged in");

  // Get data by id
  let habit = await prisma.habits.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  });

  if (!habit) {
    throw new Error("Habit not found");
  }

  if (
    habit.repeatPattern.length === 0 ||
    !patternFormatChecker(habit.repeatPattern)
  )
    throw new Error("Habit repeat type Error");

  // Get pattern object
  let patternObj = getRepeatPatternObject(habit.repeatPattern);

  // calculate first checkin start/end dates
  const {startDate, endDate} = getStartEndDate(patternObj, 0);

  return await prisma.habits.update({
    where: {
      id,
    },
    data: {
      startDate,
      endDate,
      status: true,
    },
  });
}

/**
 * Create new habit
 */
export async function createHabit(data: FormData) {
	'use server'

	// Get user session token
  const session = await getServerSession(authOptions);
	if (!session || !session.user)
		throw new Error('User not logged in')

	// Get posted data
	let habitName = data.get('habitName')?.valueOf().toString() || ''
	let repeatPattern = data.get('repeatPattern')?.valueOf().toString() || '1d'
	let emoji = data.get('emoji')?.valueOf().toString() || ''

	// Sanitize posted data
	habitName = sanitizeString( habitName )
	repeatPattern = sanitizeString( repeatPattern )

	// Validate posted data
	if ( typeof habitName !== 'string' || habitName.length === 0 )
		throw new Error('Habit name Error');
	if ( typeof repeatPattern !== 'string' || repeatPattern.length === 0 || !patternFormatChecker(repeatPattern) )
		throw new Error('Habit repeat type Error');

	// Get pattern object
	let patternObj = getRepeatPatternObject(repeatPattern)

	// calculate first checkin start/end dates
	const {startDate, endDate} = getStartEndDate (patternObj, 0)
	
	return await prisma.habits.create({
		data: {
			name: habitName,
			emoji,
			repeatPattern,
			readablePattern: patternObj.readablePattern,
			levels: patternObj.levels,
			startDate,
			endDate,
			userId: session.user.id
		}
	})
}
