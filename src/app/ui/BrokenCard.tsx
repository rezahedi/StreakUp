import { fetchBrokenData } from "@/app/lib/data"
import { BrokenItem } from "@/app/ui";

export default async function BrokenCard() {
  const data = await fetchBrokenData();

  if ( data === null )
    return <div>Not logged in</div>;

  return (
    <ul role="list">
      {data.map((habit) => (
        <BrokenItem key={habit.id} habit={habit} />
      ))}
    </ul>
  )
}
