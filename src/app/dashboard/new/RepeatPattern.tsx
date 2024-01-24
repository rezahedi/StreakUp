"use client"
import { useState, useEffect, useRef } from 'react';
import SelectDayTimes from './SelectDayTimes';
import SelectWeekDays from './SelectWeekDays';


export default function RepeatPattern() {
	const [customPattern, setCustomPattern] = useState<boolean>(false);
	const [repeatNumber, setRepeatNumber] = useState<string>('1');
	const [repeatType, setRepeatType] = useState<string>('d');
	const [selectedRepeatOptions, setSelectedRepeatOptions] = useState<string[]>([]);

	const repeatPatternRef = useRef<HTMLInputElement>(null)
	
	
	useEffect(() => {
		customPattern && handleCustomRepeatPattern()
	}, [repeatNumber, repeatType, selectedRepeatOptions])


	const callbackSelectedOptions = ( myArray: string[] ) => {
		setSelectedRepeatOptions( myArray )
	}

	const handleCustomRepeatPattern = () => {

		let customRepeat = repeatPatternRef.current
		if(customRepeat)
			customRepeat.value = 
				repeatNumber
				+ repeatType
				+ handleOptionsJoin(selectedRepeatOptions)
	}

	const handleOptionsJoin = (myArray: string[]) => {
		if(!myArray || myArray.length === 0)
			return ''
		
		if(myArray.length === 1 && myArray[0] === '')
			return ''
		
		return ' ' + myArray.join(' ')
	}

	if(customPattern)
		return (
			<>
				<div className='flex gap-2'>
					<span>Repeat every</span>
					<input name="repeatInterval" onChange={(e) => setRepeatNumber(e.target.value)} type='number' min='1' max='31' defaultValue={1}
						className="border border-gray-300 rounded px-2 py-1 text-gray-800 w-14" />
					<select name="repeatType"
						onChange={(e) => setRepeatType(e.target.value)}
						className="border border-gray-300 rounded px-2 py-1 text-gray-800 w-fit">
						<option value="d">day</option>
						<option value="w">week</option>
					</select>
				</div>
				<div className='flex gap-2'>
					<span>Repeat on</span>
					{repeatType === 'd' &&
						<SelectDayTimes callback={callbackSelectedOptions} />
					}
					{repeatType === 'w' &&
						<SelectWeekDays defaultValue={['Tuesday']} callback={callbackSelectedOptions} />
					}
				</div>
				<input type="hidden" name="repeatPattern" ref={repeatPatternRef} className='text-gray-800' />
			</>
		)

	return (
		<>
			{!customPattern && (
				<select name="repeatPattern" id='habitType' onChange={(e) => e.target.value === 'Custom' && setCustomPattern(true)}
					className="border border-gray-300 rounded px-2 py-1 text-gray-800">
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
