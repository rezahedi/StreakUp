'use client'
import Link from 'next/link'
import RepeatPattern from '@/app/dashboard/new/RepeatPattern'
import EmojiPicker from '@/app/dashboard/new/EmojiPicker'
import { createHabit } from '@/app/lib/actions'
// import { getServerSession } from "next-auth/next";
// import { authOptions } from '@/app/lib/auth';
// import { redirect } from 'next/navigation';
import ModalRadix from "@/components/ModalRadix";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'

export default function NewModal() {

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const router = useRouter();

  // Get user session token
  // const session = await getServerSession(authOptions);
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
			router.back()
			// TODO: update habits array state
			// I think habits array state should be moved to parent component then passed down as props to this component
			// then we can update the habits array state of any current page (dashboard, broken or finished or none)
			// BUT for now, I just refresh the current page!

			// TODO: close modal
			//! Bad Idea, and do not what I want
			// router.push('/dashboard')
		} else
			setError(true)
	}

	return (
    // <Modal className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
			<ModalRadix>
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
					<input id="goal" name="habitGoal" type="number" min={7} max={256} defaultValue={30} required
						className="border border-slate-300 rounded px-2 py-1 outline-none text-slate-800" />
					days
				</div>
				<div className='flex justify-end gap-2'>
					<button type="submit" className="border text-orange-500 border-orange-500 rounded px-2 py-1 hover:bg-orange-500 hover:bg-opacity-20 focus-within:bg-orange-500 focus-within:bg-opacity-20 active:scale-95 transition-all duration-75">Create</button>
					<button onClick={router.back} type='button' className='border border-gray-300 rounded px-2 py-1 hover:bg-gray-200 focus-within:bg-gray-200 active:scale-95 transition-all duration-75'>Cancel</button>
				</div>
				{loading && <p className='mt-4 text-green-500 text-center'>Loading...</p>}
				{error && <p className='mt-4 text-red-500 text-center'>Something went wrong. Please try again.</p>}
			</form>
			</ModalRadix>
    // </Modal>
	)
}