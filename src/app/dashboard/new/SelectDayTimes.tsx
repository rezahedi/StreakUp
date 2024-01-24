import { useState, useEffect } from 'react';


interface MyComponentProps {
	callback: (selectedTimes: string[]) => void
}
export default function SelectDayTimes( { callback }: MyComponentProps ) {

	const times = ['All Day', 'Morning', 'Afternoon', 'Evening'];
	const timesDuration = [
		'All Day',
		'Morning: 5am to noon',
		'Afternoon: Noon to 5pm',
		'Evening: 5pm to midnight'
	];
	const initialTimes = ['', '8am', '4pm', '8pm']
	const [selectedTimes, setSelectedTimes] = useState(['All Day'])


	// Process selectedTimes array then pass it to parent component
	useEffect(() => {
		
		// Make copy of selectedTimes to do the proccessing and avoid mutating state
		let res = [...selectedTimes]

		// Sort by times
		res.sort((a, b) => {
			return times.indexOf(a) - times.indexOf(b)
		})

		// Replace times with initialTimes
		res.map((time, index) => {
			res[index] = initialTimes[times.indexOf(time)]
		})

		// Pass selectedDays to parent component
		callback(res);

	}, [selectedTimes])


	const handleToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number, time: string) => {
		e.preventDefault();
		// e.target.blur();

		// If 'All Day' is selected, unselect all other times
		// If noting is selected, select 'All Day'
		// 'All Day' is the default selected time
		if (index == 0) {
			setSelectedTimes(['All Day'])
			return
		}
		
		// Make copy of selectedTimes to do the proccessing and avoid mutating state
		let res = [...selectedTimes]

		// If time is already selected, remove it from array
		if ( res.includes(time) )
			res = res.filter(d => d !== time)

		else
			// If time is not selected, add it to array and remove 'All Day' if it's there
			// Because if any other time is selected, 'All Day' couldn't be selected
			res = [...res.filter(d => d !== 'All Day'), time]

		// If no time is selected, select the default and it's 'All Day'
		if ( res.length < 1 )
			res = ['All Day']

		setSelectedTimes(res);
	}


	return (
		<div className="flex flex-row gap-2">
			{times.map((time, index) =>
				<Time key={index} time={time} title={timesDuration[index]} selected={
					selectedTimes.includes(time)
				} onClick={
					(e) => handleToggle(e, index, time)
				} />
			)}
		</div>
	)
}

const Time = ({ time, title, selected, onClick }:
		{
			time: string,
			title: string,
			selected: boolean,
			onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void }
	) => {
	return (
		<button className={`p-2 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-200 focus:border ${selected ? 'bg-gray-500' : ''}`}
			aria-label={title}
			title={title}
			onClick={onClick}>{time}</button>
	)
}
