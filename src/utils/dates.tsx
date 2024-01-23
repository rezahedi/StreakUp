interface patternObject {
	interval: number,
	type: string,
	repeatOn: string[],
	levels: number,
	readablePattern: string
}

// pattern format checker
export const patternFormatChecker = (pattern: string): boolean => {
	let patternRegex = /^(\d{1,2}[dwm]{1}){1}(\s[\d\w]{1,3})*$/gm
	return patternRegex.test(pattern)
}

/**
 * Get the string pattern and return an object
 * Different example patterns: 1d, 1d 8am, 2w mon wed fri, 3m 1 6 15
 * @param patternString string
**/
export const getRepeatPatternObject = (patternString: string): patternObject => {

	let [repeat, ...repeatOn] = patternString.split(' ')
	let interval = parseInt( repeat[0] )
	let type = repeat[1]
	let readablePattern = ''

	// Create the readable title string
	readablePattern =
		( interval === 1 )
			? `${getSingular(type)}`
			: `Every ${interval} ${getPlural(type)}`

	if ( repeatOn.length > 0 ) {
		readablePattern += ' on ' + repeatOn.map(num => getCompleteWord(num)).join(', ')
	}

	return {
		interval,
		type,
		repeatOn,
		levels: repeatOn.length || 1,
		readablePattern
	}	
}

export const getSingular = (repeatType: string): string => {
	let words = {
		d: 'Daily',
		w: 'Weekly',
		m: 'Monthly'
	}
	return words[ repeatType.toLowerCase() as keyof typeof words ]
}

export const getPlural = (repeatType: string): string => {
	let words = {
		d: 'days',
		w: 'weeks',
		m: 'months'
	}
	return words[ repeatType.toLowerCase() as keyof typeof words ]
}

// Get the complete word by the short initial letters
export const getCompleteWord = (short: string): string => {
	let days = {
		'8am': 'morning',
		'4pm': 'afternoon',
		'8pm': 'evening',
		'sun': 'Sunday',
		'mon': 'Monday',
		'tue': 'Tuesday',
		'wed': 'Wednesday',
		'thu': 'Thursday',
		'fri': 'Friday',
		'sat': 'Saturday'
	}
	return days[ short.toLowerCase() as keyof typeof days ] || short
}

// export const getSpace = (short: string): string => {
// 	let days = {
// 		'8am': 'morning',
// 		'4pm': 'afternoon',
// 		'8pm': 'evening',
// 		'sun': '1',
// 		'mon': '2',
// 		'tue': '3',
// 		'wed': '4',
// 		'thu': '5',
// 		'fri': '6',
// 		'sat': '7'
// 	}
// 	return days[ short.toLowerCase() as keyof typeof days ] || short
// }


interface startEndObject {
	startDate: Date,
	endDate: Date,
	lastLevel: number,
	streakIncrease: number
}
export const getStartEndDate = (patternObject: patternObject, lastLevel: number): startEndObject => {

	let streakIncrease: number = 0;
	let nextLevel: number = 0;

	// Throw error if patternObject.type != 'd' or 'w'
	if ( patternObject.type !== 'd' && patternObject.type !== 'w' )
		throw new Error('Invalid pattern type')

	// check if level is greater than the number of repeatOn then set it to 0 (first level)
	if( patternObject.levels == 1 ) {
		streakIncrease = 1
		nextLevel = 0
		lastLevel = 0
	}
	if ( lastLevel > patternObject.levels ) {
		nextLevel = 0
		lastLevel = 0
	} else {
		nextLevel = lastLevel
	}

	// If the last level is the same as the number of levels, means task compeleted, increase the streak
	if( patternObject.levels == lastLevel ) {
		streakIncrease = 1
		nextLevel = 0
	}
	
	// Day Type
	if ( patternObject.type === 'd' ) {

		let startTime: number = 24
		let endTime: number = 48

		let timeFrames = {
			'8am': {start:5,	end: 12}, // 5am - 12pm
			'4pm': {start:12, end: 17}, // 12pm - 5pm
			'8pm': {start:17, end: 24}	// 5pm - 12am
		}

		if ( patternObject.repeatOn.length ){
			startTime = 24 + timeFrames[ patternObject.repeatOn[ lastLevel ] as keyof typeof timeFrames ].start
			endTime = 24 + timeFrames[ patternObject.repeatOn[ lastLevel ] as keyof typeof timeFrames ].end
		}

		let startDate = new Date()
		startDate.setHours(startTime, 0, 0, 0)
		let endDate = new Date()
		endDate.setHours(endTime, 0, 0, 0)

		return {startDate, endDate, lastLevel: nextLevel, streakIncrease}
	}
	

	// Week Type

	// Get the day name, default is Monday
	let dayName = 'mon'
	// If multiple days was selected for the week, get the one by using 'level'
	if ( patternObject.repeatOn.length )
		dayName = patternObject.repeatOn[ lastLevel ]

	let startDate = getNextWeekDay( getWeekDayNumber( dayName ) )
	
	// Set the end date to the next day of the start date (24 hours)
	let endDate = new Date(startDate)
	endDate.setHours( 24 )

	return {startDate, endDate, lastLevel: nextLevel, streakIncrease}
}


/**
 * Get the next specific coming date in a week
 * @param day 1-7 = Sunday - Saturday
 * @returns Date
 * @example getNextWeekDay(1) // next Sunday
 * @example getNextWeekDay(7) // next Saturday
 * @example getNextWeekDay(14) // still next Saturday
 * @example getNextWeekDay(15) // still next Monday
**/
export const getNextWeekDay = (day: number): Date => {

	const today = new Date(), nextDate = new Date();

	// Plus 1 to start from 1-7 not 0-6
	const currentDay = today.getDay() + 1;
	day = day + 1;

	const daysUntilNextDate = 7 - currentDay + day % 7;
	nextDate.setDate(nextDate.getDate() + daysUntilNextDate);
	
	// Reset the time to start of day = 00:00:00
	nextDate.setHours(0, 0, 0, 0);

	return nextDate;
}

/**
 * Get the short day name and return day number
 * Starting from 0 to 6
 * @param dayShortName = sun - sat
 * @returns Number = 0 - 6
 * @returns Number = -1 if not found
 * @example getWeekDayNumber('sun') // 6
 * @example getWeekDayNumber('mon') // 1
 **/
export const getWeekDayNumber = (dayShortName: string): number => {
	
	let days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

	dayShortName = dayShortName.toLowerCase()

	return days.indexOf(dayShortName) || -1
}

export const getcomingDate = (startDate: Date): string => {
	
	let now = new Date()
	let remainingMinutes = Math.round( ( startDate.getTime() - now.getTime() ) / 1000 / 60 )

	// return remaining minutes if less than 1 hour, remaining hours if less than 1 day, else return remaining days
	if ( remainingMinutes < 5 )
		return `few minutes`

	if ( remainingMinutes < 55 )
		return `${remainingMinutes} minutes`
	
	let remainingHours = Math.round( remainingMinutes / 60 )
	if ( remainingHours === 1 )
		return `an hour`
	if ( remainingHours < 22 )
		return `${remainingHours} hours`
	
	let remainingDays = Math.round( remainingHours / 24 )
	if ( remainingDays === 1 )
		return `next day`
	return `${remainingDays} days`
}