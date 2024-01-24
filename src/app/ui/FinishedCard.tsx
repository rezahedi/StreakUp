"use client";

import { useEffect, useState } from "react";
import { fetchAllData } from "@/app/lib/data";
import { habits } from "@prisma/client";
import { TodaySkeleton } from "@/app/ui/skeletons";
import { FinishedItem, Welcome } from "@/app/ui";
import { filterToday, filterFinished } from "@/app/lib/filters";
import { restartHabit } from "@/app/lib/actions";

export default function FinishedCard() {
  const [habits, setHabits] = useState<habits[] | null>(null);
  const [today, setToday] = useState<habits[]>([]);
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
    setFinished( filterFinished(habits) );
  }, [habits]);

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
    <div className="col-span-1 auto-rows-min grid-cols-1 lg:col-span-5 mt-4">
      {loading && <TodaySkeleton count={3} />}
      {error && <div>Not logged in</div>}
      {habits && (
        <>
          {habits.length === 0 && <Welcome />}
          {habits.length !== 0 && finished.length === 0 && (<p>You haven&apos;t finished any habits yet!</p>)}
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
