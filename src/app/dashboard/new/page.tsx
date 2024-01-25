'use client'

import Link from 'next/link'
import RepeatPattern from '@/app/dashboard/new/RepeatPattern'
import EmojiPicker from '@/app/dashboard/new/EmojiPicker'
import { createHabit } from '@/app/lib/actions'
import { useRouter } from 'next/navigation';
// import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react'

export default function Home() {

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [success, setSuccess] = useState(false)
	const router = useRouter();

  // Get user session token
  // const {data: session, status} = useSession();
  // if (!session || !session.user)
  //   redirect('/')

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault()
		let formData = new FormData(e.target as HTMLFormElement);

		setError(false)
		setLoading(true)
		let result = await createHabit(formData)
		setLoading(false)
		if (result){
			setSuccess(true)
			router.push('/dashboard')
		} else
			setError(true)
	}
	
	useEffect(() => {
		console.log('error changed', error)
	}, [error])

	useEffect(() => {
		console.log('loading changed', loading)
	}, [loading])

	return (
		<div className='col-span-1 auto-rows-min grid-cols-1 lg:col-span-5 border-gray-50 rounded-lg border-2 bg-white mt-4 p-3 shadow sm:p-4'>
			<h2 className="text-xl text-orange-500 border-b border-orange-500 pb-2 my-4">New Habit:</h2>
			<form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col gap-4">
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
					<input id="goal" name="habitGoal" type="number" min={7} max={365} defaultValue={30} required
						className="border border-slate-300 rounded px-2 py-1 outline-none text-slate-800" />
					days
				</div>
				<div className='flex justify-end gap-2'>
					<button type="submit" disabled={loading} className="border text-orange-500 border-orange-500 rounded px-2 py-1 hover:bg-orange-500 hover:bg-opacity-20 focus-within:bg-orange-500 focus-within:bg-opacity-20 enabled:active:scale-95 transition-all duration-75 disabled:cursor-default">Create</button>
					<Link href="/dashboard" className='border border-gray-300 rounded px-2 py-1 hover:bg-gray-200 focus-within:bg-gray-200 active:scale-95 transition-all duration-75'>Back</Link>
				</div>
				{loading && <p className='mt-4 text-green-500 text-center'>Loading...</p>}
				{error && <p className='mt-4 text-red-500 text-center'>Something went wrong. Please try again.</p>}
				{success && <p className='mt-4 text-green-500 text-center'>Habit created!</p>}
			</form>
		</div>
	)
}