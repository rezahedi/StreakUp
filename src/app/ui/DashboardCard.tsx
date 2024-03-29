"use client";

import { useEffect, useState } from "react";
import { fetchAllData } from "@/app/lib/data";
import { habits } from "@prisma/client";
import { TodaySkeleton } from "@/app/ui/skeletons";
import { NoHabits, TodayItem, TomorrowItem, Welcome } from "@/app/ui";
import { filterToday, filterTomorrow, filterBroken, filterFinished } from "@/app/lib/filters";
import { checkinHabit, deleteHabit, updateHabitName } from "@/app/lib/actions";
import Link from "next/link";

export default function DashboardCard() {
  const [habits, setHabits] = useState<habits[] | null>(null);
  const [today, setToday] = useState<habits[]>([]);
  const [tomorrow, setTomorrow] = useState<habits[]>([]);
  const [broken, setBroken] = useState<habits[]>([]);
  const [finished, setFinished] = useState<habits[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      let data = await fetchAllData();
      setLoading(false);
      
      if (data === null) {
        setError(true);
        return;
      }
      
      setHabits(data);
    })();
  }, []);

  useEffect(() => {
    if (habits === null) return;

    setToday( filterToday(habits) );
    setTomorrow( filterTomorrow(habits) );
    setBroken( filterBroken(habits) );
    setFinished( filterFinished(habits) );
  }, [habits]);

  const checkinAction = async (id: string): Promise<boolean> => {
    if (habits === null) return false;

		try {
			let res = await checkinHabit(id)
			if (res) {
        // Update habits state
        let updatedHabits = habits.map(habit => habit.id === id ? { ...res } : habit)
        setHabits(updatedHabits)
        
        return true;
      }

		} catch (error) {
			console.error(error)
		}

    return false
  }

  const deleteAction = async (id: string): Promise<boolean> => {
    if (habits === null) return false;

    try {
      let res = await deleteHabit(id)
      if (res) {
        // Update habits state
        let updatedHabits = habits.filter(habit => habit.id !== id)
        setHabits(updatedHabits)

        return true;
      }

    } catch (error) {
      console.error(error)
    }

    return false
  }

  const saveAction = async (id: string, name: string): Promise<boolean> => {
    if (habits === null) return false;
    
    try {
      let res = await updateHabitName(id, name)
      if (res) {
        // Update habits state
        let updatedHabits = habits.map(habit => habit.id === id ? { ...res } : habit)
        setHabits(updatedHabits)

        return true;
      }
    
    } catch (error) {
      console.error(error)
    }

    return false
  }

  return (
    <div className="col-span-1 auto-rows-min grid-cols-1 lg:col-span-5 mt-4">
      {loading && <TodaySkeleton count={3} />}
      {error && <div>Not logged in</div>}
      {habits && (
        <>
          {habits.length === 0 && <Welcome />}
          {habits.length > 0 && (
            <>
              <h2>Today</h2>
              {today.length === 0 && <NoHabits />}
              {today.length > 0 && (
                <ul role="list">
                  {today.map((habit) => (
                    <TodayItem key={habit.id} habit={habit} action={checkinAction} remove={deleteAction} save={saveAction} />
                  ))}
                </ul>
              )}
            </>
          )}
          {tomorrow.length > 0 && (
            <>
              <h2>Upcoming</h2>
              <ul role="list">
                {tomorrow.map((habit) => (
                  <TomorrowItem key={habit.id} habit={habit} remove={deleteAction} save={saveAction} />
                ))}
              </ul>
            </>
          )}
          {(broken.length > 0 || finished.length > 0) && (
            <div className="flex flex-col items-center text-center text-green-500 py-10">
              <p>You have{` `}
              {broken.length > 0 && (
                <><Link href='/dashboard/broken' className="underline hover:no-underline">{broken.length} broken habits!</Link><br /></>
              )}
              {(broken.length > 0 && finished.length > 0) && (`And `)}
              {finished.length > 0 && (
                <>reached <Link href='/dashboard/finished' className="underline hover:no-underline">{finished.length} of your goals</Link> 🎉🥳</>
              )}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
