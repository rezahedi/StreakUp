import { faCalendarCheck, faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type HabitItemProps = {
	id: string;
	name: string;
	habitType: string;
	streak: number;
	createdAt: Date;
}

export function HabitItem({ id, name, habitType, streak, createdAt }: HabitItemProps) {

	return (
			<li className="flex gap-4 items-center border rounded-lg my-4 p-4">
				<input id={id} type="checkbox" className="cursor-pointer" />
				<div className="flex flex-col">
					<span className="text-slate-400 text-xs">{habitType}</span>
					<label htmlFor={id} className="text-base py-2 cursor-pointer">{name}</label>
					<div className='flex gap-8'>
						<span className="flex gap-1 text-slate-400 text-xs">
							<FontAwesomeIcon icon={faCalendarCheck} className='w-3' />
							{streak}d streak</span>
						<time className="flex gap-1 text-slate-400 text-xs">
							<FontAwesomeIcon icon={faCalendarDays} className='w-3' />
							{createdAt.toLocaleDateString()}</time>
					</div>
				</div>
			</li>
		)
}