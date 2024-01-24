import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarXmark, faChessQueen, faRectangleList } from '@fortawesome/free-regular-svg-icons'

export default function Sidebar() {
  return (
    <div className="scrollbar-hide sticky top-20 col-span-2 mt-4 hidden max-h-[calc(100vh-150px)] self-start overflow-auto rounded-lg border border-gray-100 bg-white shadow lg:block">
      <div className="grid w-full rounded-md bg-white p-6 py-8 lg:divide-y lg:divide-gray-300">
        <ul className='flex flex-col gap-1 justify-center'>
          <li>
            <Link className='flex gap-2 items-center rounded px-4 py-2 hover:bg-gray-200 focus-within:bg-gray-200 transition-all duration-75' href="/dashboard">
              <FontAwesomeIcon icon={faRectangleList} className='w-4' /> Dashboard
            </Link>
          </li>
          <li>
            <Link className='flex gap-2 items-center rounded px-4 py-2 hover:bg-gray-200 focus-within:bg-gray-200 transition-all duration-75' href="/dashboard/broken">
              <FontAwesomeIcon icon={faCalendarXmark} className='w-4' />
              Streak Broken Habits
            </Link>
          </li>
          <li>
            <Link className='flex gap-2 items-center rounded px-4 py-2 hover:bg-gray-200 focus-within:bg-gray-200 transition-all duration-75' href="/dashboard/finished">
              <FontAwesomeIcon icon={faChessQueen} className='w-4' />
              Reached Goal Habits
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
