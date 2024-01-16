import { fetchTodayData } from "@/app/lib/data"
import { TodayItem } from "@/app/ui";

export default async function TodayCard() {
  const data = await fetchTodayData();

  if ( data === null )
    return <div>Not logged in</div>;

  if ( data.length === 0 )
    return <div className="text-center text-green-500 py-16">You are all set for now!</div>;
  
  return (
    <ul role="list">
      {data.map((habit) => (
        <TodayItem key={habit.id} habit={habit} />
      ))}
    </ul>
  )
}
