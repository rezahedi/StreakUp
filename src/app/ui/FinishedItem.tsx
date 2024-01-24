"use client";
import { getRepeatPatternObject } from "@/utils/dates"
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { habits } from "@prisma/client";
import { ProgressBar } from "@/app/ui"


export default function FinishedItem(
	{ habit, action }:
	{ habit: habits, action: (id: string) => Promise<boolean> }
) {
	const [activate, setActivate] = useState(false)
  const { id, name, emoji, repeatPattern, goal, updatedAt } = habit

  let patternObject = getRepeatPatternObject(repeatPattern)

	const handleClick = async (id: string) => {
		let res = await action(id)
		if (res)
      setActivate(true)
	}

  return (
		<li className="flex gap-4 items-center rounded-lg bg-slate-100 my-4 sm:p-4 p-4" role="listitem">
			<div className='aspect-square'>
				<ProgressBar size={90} progress={0} label={`${goal} days`} />
			</div>
			<div className="grow flex gap-4 sm:items-center flex-col sm:flex-row">
        <div className="flex flex-col grow">
          <span className="text-slate-400 text-xs">{patternObject.readablePattern}</span>
          <div className={`text-lg py-2`}>{emoji} {name}</div>
          <div className='flex gap-8'>
            <time className="flex gap-1 text-slate-400 text-xs">
              <FontAwesomeIcon icon={faCalendarDays} className='w-3' />
              Finished at {updatedAt.toLocaleDateString()}</time>
          </div>
        </div>
        <button
          onClick={e => handleClick(id)}
          className='self-end sm:self-center border text-orange-500 border-orange-500 rounded px-2 py-1 hover:bg-orange-500 hover:bg-opacity-20 focus-within:bg-orange-500 focus-within:bg-opacity-20 whitespace-nowrap'>
          Start Over
        </button>
      </div>
		</li>
  )
}
