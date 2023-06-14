import RepeatPattern from '@/app/new/RepeatPattern';
import { faCalendarCheck, faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getRepeatPatternObject } from '@/utils/dates';


type myProps = {
	id: string;
	name: string;
	repeatPattern: string;
	levels: number;
	lastLevel: number;
	lastStreak: number;
	createdAt: Date;
}

export default function DoneHabitItem({ id, name, repeatPattern, levels, lastLevel, lastStreak, createdAt }: myProps) {

	let patternObject = getRepeatPatternObject(repeatPattern)

	return (
		<li className="flex gap-4 items-center rounded-lg bg-slate-700 my-4 p-4">
			<div className='aspect-square rounded-full border border-slate-500 p-6'>
				{lastLevel}/{levels}</div>
			{/* <input id={id} type="checkbox" className="cursor-pointer" /> */}
			<div className="flex flex-col grow">
				<span className="text-slate-400 text-xs">{patternObject.readablePattern}</span>
				<label htmlFor={id} className="text-lg py-2 cursor-pointer line-through">{name}</label>
				<div className='flex gap-8'>
					<span className="flex gap-1 text-slate-400 text-xs">
						<FontAwesomeIcon icon={faCalendarCheck} className='w-3' />
						{lastStreak ? `${lastStreak}d best streak` : `Not started`}</span>
					<time className="flex gap-1 text-slate-400 text-xs">
						<FontAwesomeIcon icon={faCalendarDays} className='w-3' />
						{createdAt.toLocaleDateString()}</time>
				</div>
			</div>
		</li>
	)
}