"use client";
import { getRepeatPatternObject } from "@/utils/dates"
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { habits } from "@prisma/client";
import { ProgressBar } from "@/app/ui"


export default function BrokenItem(
	{ habit, action }:
	{ habit: habits, action: (id: string) => Promise<boolean> }
) {
	const [active, setActive] = useState(false)
  const { id, name, emoji, repeatPattern, goal, lastStreak } = habit

	let patternObject = getRepeatPatternObject(repeatPattern)

  const handleClick = async (id: string) => {
		let res = await action(id)
		if (res)
			setActive(true)
	}

  return (
		<li className="flex gap-4 items-center rounded-lg bg-slate-100 my-4 p-4" role="listitem">
			<div className='aspect-square'>
				<ProgressBar size={90} progress={0} label={`${goal} days`} />
			</div>
			<div className="flex flex-col grow">
				<span className="text-slate-400 text-xs">{patternObject.readablePattern}</span>
				<div className={`text-lg text-slate-500 py-2`+(!active && ` line-through`)}>{emoji} {name}</div>
				<div className='flex gap-8'>
					<span className="flex gap-1 text-slate-400 text-xs">
						<FontAwesomeIcon icon={faCalendarCheck} className='w-3' />
						{lastStreak ? `${lastStreak}d best streak` : `Never started`}</span>
				</div>
			</div>
			{active && <span className='text-green-500'>Activated!</span>}
			{!active && 
				<button
					onClick={e => handleClick(id)}
					className='border text-orange-500 border-orange-500 rounded px-2 py-1 hover:bg-orange-500 hover:bg-opacity-20 focus-within:bg-orange-500 focus-within:bg-opacity-20 whitespace-nowrap'>
					Activate</button>
			}
		</li>
  )
}
