"use client"
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export default function ContextMenuButton() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <button type="button" className="sm:inline-flex rounded-md px-1 py-2 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200" aria-haspopup="dialog" aria-expanded="true" aria-controls="radix-:rcv:" data-state="open">
          <span className="sr-only">Edit</span>
          <svg fill="none" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="14" height="14" className="h-5 w-5 text-gray-500">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </button>
      </DropdownMenu.Trigger>
    <DropdownMenu.Content align="end" className="w-60 p-4 animate-fade-in rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
      <DropdownMenu.Item disabled className="block cursor-pointer p-2 text-sm text-gray-700 hover:bg-gray-100"
        onSelect={() => {}}>
        Show Details
      </DropdownMenu.Item>
      <DropdownMenu.Item disabled className="block cursor-pointer p-2 text-sm text-gray-700 hover:bg-gray-100"
        onSelect={() => {}}>
        Edit
      </DropdownMenu.Item>
      <DropdownMenu.Item disabled className="block cursor-pointer p-2 text-sm text-gray-700 hover:bg-gray-100"
        onSelect={() => {}}>
        Delete
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
  )
}
