import { getRepeatPatternObject, getcomingDate } from "@/utils/dates"
import { faCalendarCheck, faCalendarDays } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { habits } from "@prisma/client"
import { ProgressBar } from "@/app/ui"


export default function TomorrowItem({ habit }: { habit: habits })
{
  const { id, name, emoji, repeatPattern, goal, streak, lastStreak, startDate, createdAt } = habit

  let patternObject = getRepeatPatternObject(repeatPattern)

  return (
    <li className="flex gap-4 items-center rounded-lg bg-slate-100 my-4 p-4" role="listitem">
      <div className="aspect-square">
        <ProgressBar size={90} progress={(100/goal)*streak} label={`${streak}/${goal} days`} />
      </div>
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
          <time className="flex gap-1 text-slate-400 text-xs">
            <FontAwesomeIcon icon={faCalendarDays} className="w-3" />
            {createdAt.toLocaleDateString()}
          </time>
        </div>
      </div>
      {startDate && <div className="whitespace-nowrap">In {getcomingDate(startDate)}</div>}
    </li>
  )
}
