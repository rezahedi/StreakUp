"use client";
import { getRepeatPatternObject } from "@/utils/dates"
import { faCalendarCheck, faCalendarDays } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { habits } from "@prisma/client";
import { ProgressBar } from "@/app/ui"


export default function TodayItem(
	{ habit, action }:
	{ habit: habits, action: (id: string) => Promise<boolean> }
) {
	const [checkin, setCheckin] = useState(false)
  const { id, name, emoji, repeatPattern, goal, streak, lastStreak, createdAt } = habit

  let patternObject = getRepeatPatternObject(repeatPattern)

	const handleClick = async (id: string) => {
		let res = await action(id)
		if (res)
			setCheckin(true)
	}

  return (
		<li className="flex gap-4 items-center rounded-lg bg-slate-100 my-4 p-4" role="listitem">
			<div className='aspect-square'>
				<ProgressBar size={90} progress={(100/goal)*streak} label={`${streak}/${goal} days`} />
			</div>
			<div className="flex flex-col grow">
				<span className="text-slate-400 text-xs">{patternObject.readablePattern}</span>
				<div className={`text-lg py-2`+(checkin && ` line-through`)}>{emoji} {name}</div>
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
					onClick={e => handleClick(id)}
					className='border text-orange-500 border-orange-500 rounded px-2 py-1 hover:bg-orange-500 hover:bg-opacity-20 focus-within:bg-orange-500 focus-within:bg-opacity-20 whitespace-nowrap'>
					Check-in</button>
			}
		</li>
  )
}
