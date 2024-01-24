import Link from 'next/link'

export default function Sidebar() {
  return (
    <div className="scrollbar-hide sticky top-20 col-span-2 mt-6 hidden max-h-[calc(100vh-150px)] self-start overflow-auto rounded-lg border border-gray-100 bg-white shadow lg:block">
      <div className="grid w-full rounded-md bg-white p-6 lg:divide-y lg:divide-gray-300">
        <ul>
          <li><Link href="/dashboard">Today Habits</Link></li>
          <li><Link href="/dashboard/broken">Streak Broken Habits</Link></li>
          <li><Link href="/dashboard/finished">Reached Goal Habits</Link></li>
        </ul>
      </div>
    </div>
  )
}
