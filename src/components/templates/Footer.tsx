import React from 'react'
import { Github } from '@/components/templates'

export default function Footer() {
  return (
    <div className='pt-10'>
      <div className="mt-16 border-t border-gray-900/10 py-8 sm:mt-20 lg:mt-24">
        <div className='flex items-center mx-auto w-full max-w-screen-xl px-2.5 lg:px-20'>
          <p className="grow text-sm leading-5 text-gray-500">© 2024 StreakUp</p>
          <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full p-2 sm:px-4 text-sm text-gray-50 bg-gray-500 shadow-md transition-colors hover:bg-gray-900"
            href="https://github.com/rezahedi/streakup"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            <p className='hidden sm:block'>Star on GitHub</p>
          </a>
        </div>
      </div>
    </div>
  )
}
