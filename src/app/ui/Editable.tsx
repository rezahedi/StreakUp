'use client'

import { useState, useEffect, useRef } from 'react'


export default function Editable({
  children, onSave
}: {
  children: string,
  onSave: (name: string) => Promise<boolean>
}) {
  const [message, setMessage] = useState<string>('')
  const [editable, setEditable] = useState(false)
  const [text, setText] = useState(children)
  const editableRef = useRef<HTMLDivElement>(null)

  // Exit edit mode when focus is lost
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if(!editable) return
    console.log('handleBlur')

    setEditable(false)
    setMessage('')
  }

  // Call save action when text changes
  useEffect(() => {
    (async () => {
      if (text === children) return

      setMessage('Saving...')
      let result = await onSave(text)
      setMessage(result ? 'Saved!' : 'Name must be between 3 and 50 characters.')
      setTimeout(() => setMessage(''), 2000)
      // TODO: handle error or result
      // TODO: if not saved, revert text
    })()
  }, [text])

  // Edit mode status actions
  useEffect(() => {
    if (editable) // Focus input if enabled
      editableRef.current?.focus()    
    else{ // Set text state if disabled
      let newText = editableRef.current!.textContent || ''
      newText = newText.trim()

      if ( newText.length>=3 && newText.length<=50 )
        setText( newText )
      else
        setMessage('Name must be between 3 and 50 characters.')
    }
  }, [editable])

  // Edit mode if clicked
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    setEditable(true)
    setMessage('Autosave, Hit Enter or Esc to exit.')
    e.currentTarget.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ( ['Enter', 'Tab', 'Escape'].includes(e.key) ) {
      e.preventDefault()
      e.currentTarget.blur()
    }
  }

  return (
    <span className={`select-none inline-flex flex-col ${editable ? `cursor-text` : `cursor-pointer`}`} title="Click to inline edit">
      <div ref={editableRef} onBlur={handleBlur} onClick={handleClick} onKeyDown={handleKeyDown} contentEditable={editable}
      className='inline-block focus:outline-none focus:border focus:border-gray-300 focus:rounded'>{text}</div>
      {message && <i className='text-xs text-gray-600'>{message}</i>}
    </span>
  )
}
