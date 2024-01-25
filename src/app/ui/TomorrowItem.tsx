import { getRepeatPatternObject, getcomingDate } from "@/utils/dates"
import { faCalendarCheck, faCalendarDays } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { habits } from "@prisma/client"
import { ContextMenuButton, ProgressBar } from "@/app/ui"


export default function TomorrowItem({
  habit,
  remove
}: {
  habit: habits,
  remove: (id: string) => Promise<boolean>
}) {
  const { id, name, emoji, repeatPattern, goal, streak, lastStreak, startDate, createdAt } = habit

  let patternObject = getRepeatPatternObject(repeatPattern)

  return (
    <li className="flex gap-4 items-center border-gray-50 rounded-lg border-2 bg-white my-4 p-3 pr-1 shadow transition-all hover:shadow-md sm:p-4" role="listitem">
      <div className="aspect-square">
        <ProgressBar size={90} progress={(100/goal)*streak} label={`${streak}/${goal} days`} />
      </div>
			<div className="grow flex gap-4 sm:items-center flex-col sm:flex-row">
        <div className="flex flex-col grow">
          <span className="text-slate-400 text-xs">
            {patternObject.readablePattern}
          </span>
          <div className="text-lg py-2">{emoji} {name}</div>
          <div className="flex gap-8">
            <span className="flex gap-1 text-slate-400 text-xs">
              <FontAwesomeIcon icon={faCalendarCheck} className="w-3" />
              {streak ? `${streak}d streak / ` : ``}
              {lastStreak ? `${lastStreak}d best streak` : `Not started`}
            </span>
            <time className="hidden sm:flex gap-1 text-slate-400 text-xs">
              <FontAwesomeIcon icon={faCalendarDays} className="w-3" />
              {createdAt.toLocaleDateString()}
            </time>
          </div>
        </div>
        <div className="self-end sm:self-center flex gap-2 items-center">
          {startDate && <div className="whitespace-nowrap border border-slate-400 rounded px-2 py-1">In {getcomingDate(startDate)}</div>}
          <ContextMenuButton id={id} remove={remove} />
        </div>
      </div>
    </li>
  )
}
