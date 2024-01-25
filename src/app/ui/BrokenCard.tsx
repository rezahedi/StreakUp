"use client";

import { useEffect, useState } from "react";
import { fetchAllData } from "@/app/lib/data";
import { habits } from "@prisma/client";
import { TodaySkeleton } from "@/app/ui/skeletons";
import { BrokenItem, Welcome } from "@/app/ui";
import { filterToday, filterBroken } from "@/app/lib/filters";
import { activateHabit, deleteHabit } from "@/app/lib/actions";

export default function BrokenCard() {
  const [habits, setHabits] = useState<habits[] | null>(null);
  const [today, setToday] = useState<habits[]>([]);
  const [broken, setBroken] = useState<habits[]>([]);
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
    setBroken( filterBroken(habits) );
  }, [habits]);

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

  return (
    <div className="col-span-1 auto-rows-min grid-cols-1 lg:col-span-5 mt-4">
      {loading && <TodaySkeleton count={3} />}
      {error && <div>Not logged in</div>}
      {habits && (
        <>
          {habits.length === 0 && <Welcome />}
          {habits.length !== 0 && broken.length === 0 && (<p>Yay, You don&apos;t have any broken habits!</p>)}
          {broken.length > 0 && (
            <>
              <h2>Broken</h2>
              <ul role="list">
                {broken.map((habit) => (
                  <BrokenItem key={habit.id} habit={habit} action={activateAction} remove={deleteAction} />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  )
}
