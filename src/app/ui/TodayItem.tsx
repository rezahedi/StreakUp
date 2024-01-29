"use client";
import { getRepeatPatternObject } from "@/utils/dates"
import { faCalendarCheck, faCalendarDays } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { habits } from "@prisma/client";
import { ProgressBar } from "@/app/ui"
import { lazy, Suspense } from "react"
import { VerticalEllipsis } from "@/app/ui/icons";
const ContextMenuButton = lazy(() => import('@/app/ui/ContextMenuButton'))
const Editable = lazy(() => import('@/app/ui/Editable'))

export default function TodayItem(
	{
		habit, action, remove, save
	}: {
		habit: habits,
		action: (id: string) => Promise<boolean>,
		remove: (id: string) => Promise<boolean>,
		save: (id: string, name: string) => Promise<boolean>
	}
) {
	const [checkin, setCheckin] = useState(false)
  const { id, name, emoji, repeatPattern, goal, streak, lastStreak, createdAt } = habit

  let patternObject = getRepeatPatternObject(repeatPattern)

	const handleClick = async (id: string) => {
		let res = await action(id)
		if (res)
			setCheckin(true)
	}

	const handleSave = async (name: string) => {
		let res = await save(id, name)
		return res
	}

  return (
		<li className="flex gap-4 items-center border-gray-50 rounded-lg border-2 bg-white my-4 p-3 pr-1 shadow transition-all hover:shadow-md sm:p-4" role="listitem">
			<div className='aspect-square'>
				<ProgressBar size={90} progress={(100/goal)*streak} label={`${streak}/${goal} days`} />
			</div>
			<div className="grow flex gap-4 sm:items-center flex-col sm:flex-row">
				<div className="flex flex-col grow">
					<span className="text-slate-400 text-xs">{patternObject.readablePattern}</span>
					<div className={`text-lg py-2`+(checkin && ` line-through`)}>
						{emoji}
						<Suspense fallback={<>{name}</>}>
							<Editable onSave={handleSave}>{name}</Editable>
						</Suspense>
					</div>
					<div className='flex gap-8'>
						<span className="flex gap-1 text-slate-400 text-xs">
							<FontAwesomeIcon icon={faCalendarCheck} className='w-3' />
							{streak ? `${streak}d streak / ` : ``}
							{lastStreak ? `${lastStreak}d best streak` : `Not started`}
						</span>
						<time className="hidden sm:flex gap-1 text-slate-400 text-xs">
							<FontAwesomeIcon icon={faCalendarDays} className='w-3' />
							{createdAt.toLocaleDateString()}</time>
					</div>
				</div>
				<div className="self-end sm:self-center flex gap-2 items-center">
					{checkin && <span className='text-green-500'>Checked in</span>}
					{!checkin && 
						<button
							onClick={e => handleClick(id)}
							className='border text-orange-500 border-orange-500 rounded px-2 py-1 hover:bg-orange-500 hover:bg-opacity-20 focus-within:bg-orange-500 focus-within:bg-opacity-20 active:scale-95 transition-all duration-75 whitespace-nowrap'>
							Check-in</button>
					}
					<Suspense fallback={<VerticalEllipsis className='p-1 fill-gray-500' />}>
						<ContextMenuButton id={id} remove={remove} />
					</Suspense>
				</div>
			</div>
		</li>
  )
}
