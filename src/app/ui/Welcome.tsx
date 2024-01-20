import Image from 'next/image'
import CreateHabitBtn from "./CreateHabitBtn";

export default function Welcome() {
  return (
    <div className="flex flex-col items-center text-green-500 py-16">
      <Image src="/images/welcome.gif" alt='welcome' className='rounded-xl mb-2' width={450} height={250} />
      <p>Create your first habit to get started!</p>
      <CreateHabitBtn text="First Habit" className="mt-6" />
    </div>
  )
}
