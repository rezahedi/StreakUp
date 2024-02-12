/**
 * Get UTC time from any time
 * 
 * @param date any date
 * @returns UTC date
 * 
 **/
export function getUTCDate(date: Date): Date
{
  // Get the timezone offset in minutes
  // And convert minutes to milliseconds
  let timezoneOffset = date.getTimezoneOffset() * 60000;
  
  // Return the UTC date
  return new Date( date.getTime() + timezoneOffset );
}


/**
 * Get local time from UTC time
 * By passing local timezone offset
 * 
 * @param dateUTC UTC date
 * @param localTimezoneOffset Local timezone offset in hours
 * @returns Local date
 * 
 **/
export function getLocalDate(dateUTC: Date, localTimezoneOffset: number): Date
{
  let oneHourInMilliseconds = 3600000;

  // Convert hours to milliseconds
  localTimezoneOffset *= oneHourInMilliseconds;
  
  // Return the local date
  return new Date( dateUTC.getTime() - localTimezoneOffset );
}


/**
 * Check if the current timezone is in Daylight Saving Time
 * 
 * @returns true if the current timezone is in Daylight Saving Time
 * 
 **/
function isDST()
{
  var today = new Date();
  var januaryOffset = new Date(today.getFullYear(), 0, 1).getTimezoneOffset();
  var currentOffset = today.getTimezoneOffset();

  return currentOffset !== januaryOffset;
}


export type timezoneProp = {
  title: string,
  offset: number
}


/**
 * 
 * Get timezone offset in float number
 * Example timezone: +4:45 return 4.75
 * 
 * @param timezoneString Timezone string ex: 'America/Denver'
 * @returns Timezone offset in float number
 * 
 */
export function getTimezoneOffset(timezoneString: string): number
{
  const date = new Date()
  const utc = new Date( date.getTime() + (date.getTimezoneOffset() * 60000) )

  // get date by timezoneString for example timezoneString = 'America/Denver'
  const local = new Date( date.toLocaleString('en-US', { timeZone: timezoneString }) )

  // Get difference in hours
  let difference = (local.getTime() - utc.getTime()) / 3600000

  // Return rounded difference with one decimal
  return Math.round( difference * 10 ) / 10
}


/**
 * Convert float to time format ex: 5.75 to 5:45
 * 
 * @param offset Timezone offset in float number
 * @returns Timezone offset in time format ex: 5:30
 * 
 */
export function floatToTimeFormat(offset: number): string
{
  let hours = Math.floor(offset)
  let decimals = (offset - hours)
  // Numbers in JavaScript are "double-precision 64-bit format IEEE 754 values", according to the spec.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_overview#numbers
  decimals = Math.round(decimals * 1e12) / 1e12

  let minutes = decimals * 60

  return hours + ':' + minutes.toString().padStart(2, '0')
}


/**
 * Get timezones titles and offsets
 * 
 * @returns Array of timezoneProp objects
 * 
 */
export const getTimezoneOptions = (): timezoneProp[] =>
{
  let timezones: timezoneProp[] = []
  for (const timeZone of Intl.supportedValuesOf('timeZone') ) {
    timezones.push({
      title: timeZone,
      offset: getTimezoneOffset(timeZone)
    })
  }
  return timezones
};
