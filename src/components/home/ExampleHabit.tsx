interface HabitProps {
  name: string;
  repeatPattern: string;
  emoji: string;
  status: string;
}

export default function ShadowHabit({habit}: {habit: HabitProps}) {
  return (
    <li className="flex gap-1 items-center rounded-md border border-gray-200 bg-white p-3 shadow-lg">
      <div className="mr-2 h-10 w-10 rounded-full border border-gray-200 text-2xl flex items-center justify-center">{habit.emoji}</div>
      <div className="flex-1 items-start flex flex-col gap-2">
        <div className="h-6 rounded-md font-bold">{habit.name}</div>
        <div className="">{habit.repeatPattern}</div>
      </div>
      <div>
        <div className="px-2 rounded-md border border-gray-200">{habit.status}</div>
      </div>
    </li>
  )
}
