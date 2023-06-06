"use client"
import { useState } from 'react';
import SelectDayTimes from './SelectDayTimes';
import SelectWeekDays from './SelectWeekDays';

export default function RepeatPattern() {
	const [custom, setCustom] = useState(false);
	const [repeatType, setRepeatType] = useState('d');

	const callbackSelectedTimes = (selectedTimes) => {
		console.log(selectedTimes)
	}

	const callbackSelectedDays = (selectedDays) => {
		console.log(selectedDays)
	}

	return (
		<>
			{custom && <>
				<div className='flex gap-2'>
					<span>Repeat every</span><input type='number' min='1' max='31' defaultValue={1} className="border border-slate-300 rounded px-2 py-1 outline-none text-slate-800 w-14" />
						<select name="repeatType" id="repeatType"
							onChange={(e) => setRepeatType(e.target.value)}
							className="border border-slate-300 rounded px-2 py-1 text-slate-800 w-fit">
							<option value="d">day</option>
							<option value="w">week</option>
						</select>
				</div>
				<div className='flex gap-2'>
					<span>Repeat on</span>
					{repeatType === 'd' &&
						<SelectDayTimes callback={callbackSelectedTimes} />
					}
					{repeatType === 'w' &&
						<SelectWeekDays defaultValue={['Tuesday']} callback={callbackSelectedDays} />
					}
				</div>
			</>}
			{!custom && (
				<select id="habitType" name="habitType" onChange={(e) => e.target.value === 'Custom' && setCustom(true)}
					className="border border-slate-300 rounded px-2 py-1 outline-none text-slate-800">
					<option value="1d">Daily</option>
					<option value="1w Tue">Weekly on Tuesday</option>
					<option value="1w Mon Tue Wed Thu Fri">Every weekday (Mon to Fri)</option>
					<option value="1w Sat Sun">Every weekend (Sat & Sun)</option>
					<option value="Custom">Custom ...</option>
				</select>
			)}
		</>
	)
}
