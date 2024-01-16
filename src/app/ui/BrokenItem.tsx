"use client";
import { getRepeatPatternObject } from "@/utils/dates"
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { activateHabit } from "@/app/lib/actions";

export default function BrokenItem({ habit }) {
	const [active, setActive] = useState(false)
  const { id, name, repeatPattern, levels, lastLevel, lastStreak, createdAt } = habit

	let patternObject = getRepeatPatternObject(repeatPattern)

  const handleActivation = async (id: string) => {
		try {
			let res = await activateHabit(id)
			if (res)
				setActive(true)

		} catch (error) {
			console.error(error)
		}
	}

  return (
		<li className="flex gap-4 items-center rounded-lg bg-slate-100 my-4 p-4" role="listitem">
			<div className="flex flex-col grow">
				<span className="text-slate-400 text-xs">{patternObject.readablePattern}</span>
				<label htmlFor={id} className={`text-lg py-2 cursor-pointer`+(!active && ` line-through`)}>{name}</label>
				<div className='flex gap-8'>
					<span className="flex gap-1 text-slate-400 text-xs">
						<FontAwesomeIcon icon={faCalendarCheck} className='w-3' />
						{lastStreak ? `${lastStreak}d best streak` : `Never started`}</span>
				</div>
			</div>
			{active && <span className='text-green-500'>Activated!</span>}
			{!active && 
				<button
					onClick={e => handleActivation(id)}
					className='border text-orange-500 border-orange-500 rounded px-2 py-1 hover:bg-orange-500 hover:bg-opacity-20 focus-within:bg-orange-500 focus-within:bg-opacity-20 whitespace-nowrap'>
					Activate</button>
			}
		</li>
  )
}
