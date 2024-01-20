import CreateHabitBtn from "./CreateHabitBtn";

export default function Welcome() {
  return (
    <div className="flex flex-col items-center text-green-500 py-16">
      <b>Welcome to StreakUp 🎉</b>
      <p>Create your first habit to get started!</p>
      <CreateHabitBtn text="First Habit" className="mt-4" />
    </div>
  )
}
