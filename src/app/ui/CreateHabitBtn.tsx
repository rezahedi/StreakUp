"use client";

import { useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function CreateHabitBtn(
  {text = 'Start New Habit', className = ''}:
  {text?: string, className?: string}
) {

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
    <button onClick={handleClick} className={`group flex items-center space-x-3 rounded-md border border-black bg-black px-3 py-2 text-sm font-medium text-white transition-all duration-75 hover:bg-white hover:text-black active:scale-95 ` + className}>
      <p>{text}</p>
      <kbd className="hidden rounded bg-zinc-700 px-2 py-0.5 text-xs font-light text-gray-400 transition-all duration-75 group-hover:bg-gray-100 group-hover:text-gray-500 md:inline-block">S</kbd>
    </button>
  )
}
