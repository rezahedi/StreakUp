'use client'
import { useState } from 'react';
import RepeatPattern from '@/app/new/RepeatPattern';
import { redirect } from 'next/navigation';
import { faCalendarCheck, faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getRepeatPatternObject, getStartEndDate, patternFormatChecker } from '@/utils/dates';


type myProps = {
	id: string;
	name: string;
	repeatPattern: string;
	levels: number;
	lastLevel: number;
	streak: number;
	lastStreak: number;
	createdAt: Date;
	checkinHabit: (id: string) => void;
}

export default function HabitItem(
	{
		id, name, repeatPattern, levels, lastLevel, streak, lastStreak, createdAt, checkinHabit
	}: myProps
) {

	let patternObject = getRepeatPatternObject(repeatPattern)
	const [checkin, setCheckin] = useState(false)

	const handleCheckin = async (id: string) => {
		try {
			let res = checkinHabit(id)
			if (res)
				setCheckin(true)

		} catch (error) {
			console.error(error)
		}
	}

	return (
		<li className="flex gap-4 items-center rounded-lg bg-slate-700 my-4 p-4">
			<div className='aspect-square rounded-full border border-slate-500 p-6'>
				{lastLevel}/{levels}</div>
			{/* <input id={id} type="checkbox" className="cursor-pointer" /> */}
			<div className="flex flex-col grow">
				<span className="text-slate-400 text-xs">{patternObject.readablePattern}</span>
				<label htmlFor={id} className={`text-lg py-2 cursor-pointer`+(checkin && ` line-through`)}>{name}</label>
				<div className='flex gap-8'>
					<span className="flex gap-1 text-slate-400 text-xs">
						<FontAwesomeIcon icon={faCalendarCheck} className='w-3' />
						{streak ? `${streak}d streak / ` : ``}
						{lastStreak ? `${lastStreak}d best streak` : `Not started`}
					</span>
					<time className="flex gap-1 text-slate-400 text-xs">
						<FontAwesomeIcon icon={faCalendarDays} className='w-3' />
						{createdAt.toLocaleDateString()}</time>
				</div>
			</div>
			{checkin && <span className='text-green-500'>Checked in</span>}
			{!checkin && 
				<button
					onClick={e => handleCheckin(id)}
					className='border text-orange-500 border-orange-500 rounded px-2 py-1 hover:bg-orange-500 hover:bg-opacity-20 focus-within:bg-orange-500 focus-within:bg-opacity-20 whitespace-nowrap'>
					Check-in</button>
			}
		</li>
	)
}