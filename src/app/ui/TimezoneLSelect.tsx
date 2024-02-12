
import { getTimezoneOptions, getTimezoneOffset, floatToTimeFormat, timezoneProp } from '@/app/lib/date'

export default function TimezoneLSelect( {value}: {value?: string} ) {
  
  // Get timezones
  const timezones: timezoneProp[] = getTimezoneOptions()
  
  // Sort timezones by offset value
  timezones.sort((a, b) => a.offset > b.offset ? 1 : -1)

  return (
    <select id="timezone" name="timezone" required className="grow border border-slate-300 rounded px-2 py-1 outline-none text-slate-800">
      <option value="" disabled selected>Select Timezone</option>
      {timezones.map((timezone, key) => (
        <option key={key} value={timezone.title} selected={value===timezone.title}>
          {floatToTimeFormat(timezone.offset)} - {timezone.title}
        </option>
      ))}
    </select>
  )
}
