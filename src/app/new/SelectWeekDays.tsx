import { useState, useEffect } from 'react';


interface MyComponentProps {
	defaultValue: string[],
	callback: (selectedDays: string[]) => void
}

export default function SelectWeekDays ( { defaultValue, callback }: MyComponentProps ) {
	
	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thuesday', 'Friday', 'Saturday', 'Sunday'];
	const [selectedDays, setSelectedDays] = useState(defaultValue || ['Monday'])


	// Process selectedDays array then pass it to parent component
	useEffect(() => {

		// Make copy of selectedDays to do the proccessing and avoid mutating state
		let rawData = [...selectedDays]

		// Sort by week days
		rawData.sort((a, b) => {
			return days.indexOf(a) - days.indexOf(b)
		})

		// lowercase and sub three first letters
		rawData.map((day, index) => {
			rawData[index] = day.toLowerCase().substring(0, 3)
		})
		
		// Pass processed data to parent component
		callback(rawData);

	}, [selectedDays])


	const handleToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>
		, day: string) => {
		e.preventDefault();
		// e.target.blur();

		if (selectedDays.includes(day)) {
			setSelectedDays( selectedDays.filter(d => d !== day) )
		} else {
			setSelectedDays( [...selectedDays, day] )
		}
	}

	return (
		<div className="flex flex-row gap-2">
			{days.map((day, index) =>
				<Day key={index} day={day} selected={
					selectedDays.includes(day)
				} onClick={
					(e) => handleToggle(e, day)
				} />
			)}
		</div>
	)
}

const Day = ({ day, selected, onClick }: {
	day: string,
	selected: boolean,
	onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}) => {
	return (
		<button className={`w-10 p-2 aspect-square rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-200 focus:border ${selected ? 'bg-gray-500' : ''}`}
			aria-label={day}
			title={day}
			onClick={onClick}>{day.charAt(0)}</button>
	)
}
