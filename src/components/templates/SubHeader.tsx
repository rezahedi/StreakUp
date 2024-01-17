"use client";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function SubHeader() {
  const router = useRouter();

  function handleClick() {
    router.push('/new');
  }

  // event listener if user hit 'S' key call handleClick
  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 's') {
        handleClick();
      }
    });
  }, []);


  return (
    <div className="flex h-36 items-center border-b border-gray-200 bg-white mb-4">
      <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl text-gray-600">
              Welcome back 👋
            </h1>
            <p className="text-gray-400 text-sm">{new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date())}</p>            
          </div>
          <button onClick={handleClick} className="group flex items-center space-x-3 rounded-md border border-black bg-black px-3 py-2 text-sm font-medium text-white transition-all duration-75 hover:bg-white hover:text-black active:scale-95">
            <p>Start New Habit</p>
            <kbd className="hidden rounded bg-zinc-700 px-2 py-0.5 text-xs font-light text-gray-400 transition-all duration-75 group-hover:bg-gray-100 group-hover:text-gray-500 md:inline-block">S</kbd>
          </button>
        </div>
      </div>
    </div>
  )
}
