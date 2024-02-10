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