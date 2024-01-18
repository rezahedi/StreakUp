import { fetchTomorrowData } from "@/app/lib/data"
import { TomorrowItem } from "@/app/ui";


export default async function TomorrowCard()
{
  const data = await fetchTomorrowData();

  if ( data === null )
    return <div>Not logged in</div>;

  return (
    <ul role="list">
      {data.map((habit) => (
        <TomorrowItem key={habit.id} habit={habit} />
      ))}
    </ul>
  )
}
