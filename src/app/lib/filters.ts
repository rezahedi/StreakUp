import { habits } from "@prisma/client";

export const filterToday = (habits: habits[]) =>
{
  let data: habits[];

  // Filter by status=1, startDate <= now =< endDate
  data = habits.filter(habit => {
    const now = new Date();
    return (
      habit.status === 1 &&
      habit.startDate && habit.endDate &&
      habit.startDate <= now && habit.endDate >= now
    )
  })

  // Sort by endDate ascending
  data.sort( (a, b) => a.endDate!.getTime() - b.endDate!.getTime() );

  return data;
}

export const filterTomorrow = (habits: habits[]) =>
{
  let data: habits[];

  // Filter by status=1, startDate >= now
  data = habits.filter(habit => {
    const now = new Date();
    return (
      habit.status === 1 &&
      habit.startDate &&
      habit.startDate >= now
    )
  })

  // Sort by startDate ascending
  data.sort( (a, b) => a.startDate!.getTime() - b.startDate!.getTime() );

  return data;
}

export const filterBroken = (habits: habits[]) =>
{
  let data: habits[];

  // Filter by status=0
  data = habits.filter(habit => {
    const now = new Date();
    return (
      habit.status === 0
    )
  })

  // Sort by updatedAt descending
  data.sort( (a, b) => b.updatedAt!.getTime() - a.updatedAt!.getTime() );

  return data;
}