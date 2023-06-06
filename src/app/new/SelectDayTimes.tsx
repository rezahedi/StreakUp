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


	const handleToggle = (e, index: number, time: string) => {
		e.preventDefault();

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

const Time = ({ time, title, selected, onClick }) => {
	return (
		<button className={`p-3 rounded-full border border-transparent bg-slate-700 cursor-pointer outline-none hover:bg-slate-500 focus:bg-slate-500 ${selected ? 'bg-slate-600 border-slate-100' : ''}`}
			aria-label={title}
			title={title}
			onClick={onClick}>{time}</button>
	)
}
