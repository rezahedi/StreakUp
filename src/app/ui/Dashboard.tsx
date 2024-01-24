"use client";

import { useEffect, useState } from "react";
import { fetchAllData } from "@/app/lib/data";
import { habits } from "@prisma/client";
import { TodaySkeleton } from "@/app/ui/skeletons";
import { NoHabits, TodayItem, TomorrowItem, BrokenItem, FinishedItem, Welcome } from "@/app/ui";
import { filterToday, filterTomorrow, filterBroken, filterFinished } from "@/app/lib/filters";
import { activateHabit, restartHabit, checkinHabit } from "@/app/lib/actions";

export default function Dashboard() {
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

  const activateAction = async (id: string): Promise<boolean> => {
    if (habits === null) return false;

		try {
			let res = await activateHabit(id)
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
  
  const restartAction = async (id: string): Promise<boolean> => {
    if (habits === null) return false;

		try {
			let res = await restartHabit(id)
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
    <div className="mx-auto lg:max-w-screen-xl px-2.5 lg:px-20">
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
                    <TodayItem key={habit.id} habit={habit} action={checkinAction} />
                  ))}
                </ul>
              )}
            </>
          )}
          {tomorrow.length > 0 && (
            <>
              <h2>Tomorrow</h2>
              <ul role="list">
                {tomorrow.map((habit) => (
                  <TomorrowItem key={habit.id} habit={habit} />
                ))}
              </ul>
            </>
          )}
          {broken.length > 0 && (
            <>
              <h2>Broken</h2>
              <ul role="list">
                {broken.map((habit) => (
                  <BrokenItem key={habit.id} habit={habit} action={activateAction} />
                ))}
              </ul>
            </>
          )}
          {finished.length > 0 && (
            <>
              <h2>Finished</h2>
              <ul role="list">
                {finished.map((habit) => (
                  <FinishedItem key={habit.id} habit={habit} action={restartAction} />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  )
}
