const habits = [
  {
    emoji: "🏋️",
    name: "Light Workout",
  },
  {
    emoji: "🥛",
    name: "Drink Water",
  },
  {
    emoji: "🧘",
    name: "Do Yoga",
  },
  {
    emoji: "📚",
    name: "Read Book",
  },
  {
    emoji: "🧑‍💻",
    name: "Write Code",
  },
  {
    emoji: "🥗",
    name: "Eat Healthy",
  },
  {
    emoji: "🧹",
    name: "Clean Room",
  },
  {
    emoji: "🧼",
    name: "Wash Dishes",
  },
  {
    emoji: "🧺",
    name: "Do Laundry",
  },
  {
    emoji: "⚙️",
    name: "Custom Habit",
  },
];

export default function HabitPicker() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Choose Habit</h2>
      <p>Choose from the following habits or create a custom one:</p>
      <div className="mt-4 gap-4 grid grid-cols-4" role="list">
        {habits.map((habit, index) => (
          <div key={index} tabIndex={0} role="listitem"
            className="flex flex-col flex-1 gap-2 items-center justify-center py-6 px-9 rounded-xl border border-gray-300 cursor-pointer hover:bg-slate-50">
            <span className="text-6xl">{habit.emoji}</span>
            <b className="font-bold">{habit.name}</b>
          </div>
        ))}
      </div>
    </div>
  )
}
