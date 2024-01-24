import Link from 'next/link'
import RepeatPattern from '@/app/new/RepeatPattern'
import EmojiPicker from '@/app/new/EmojiPicker'
import { createHabit } from '@/app/lib/actions'
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/app/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {

  // Get user session token
  const session = await getServerSession(authOptions);
  if (!session || !session.user)
    redirect('/')

	return (
		<div className='col-span-1 auto-rows-min grid-cols-1 lg:col-span-5 border-gray-50 rounded-lg border-2 bg-white mt-6 p-3 shadow sm:p-4'>
			<h2 className="text-xl text-orange-500 border-b border-orange-500 pb-2 my-4">New Habit:</h2>
			<form action={createHabit} className="flex flex-col gap-4">
				<label htmlFor="name" className="text-slate-400 text-xs">
					What habit do you want to streak up?
				</label>
				<div className='flex gap-4 items-center'>
					<input id="name" name="habitName" type="text" minLength={3} maxLength={50} required
						placeholder='Example: Read books for 30 min'
						className="grow border border-slate-300 rounded px-2 py-1 outline-none text-slate-800" />
					<EmojiPicker name='emoji' defaultValue='🙄' />
				</div>
				<label htmlFor="habitType" className="text-slate-400 text-xs">
					How often do you want to do it?
				</label>
				<RepeatPattern />
				<label htmlFor="habitGoal" className="text-slate-400 text-xs">
					Set a goal but not a long one!
				</label>
				<div className='flex gap-4 items-center'>
					<input id="goal" name="habitGoal" type="number" min={7} max={256} defaultValue={30} required
						className="border border-slate-300 rounded px-2 py-1 outline-none text-slate-800" />
					days
				</div>
				<div className='flex justify-end gap-2'>
					<button type="submit" className="border text-orange-500 border-orange-500 rounded px-2 py-1 hover:bg-orange-500 hover:bg-opacity-20 focus-within:bg-orange-500 focus-within:bg-opacity-20 active:scale-95 transition-all duration-75">Create</button>
					<Link href=".." className='border border-gray-300 rounded px-2 py-1 hover:bg-gray-200 focus-within:bg-gray-200 active:scale-95 transition-all duration-75'>Back</Link>
				</div>
			</form>
		</div>
	)
}