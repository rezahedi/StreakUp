"use client";
import { useState, useRef, useEffect } from 'react';

const emojis = [
  '🏃', '🏊', '🚶', '📚', '🥗',
  '🎨', '🧘', '🚵', '🏋️‍♂️', '😴',
  '🥛', '🤝', '💰', '📵', '💞',
  '🛁', '⏰', '🌞'
];

const EmojiPicker = (
  { name: inputName = 'emoji', defaultValue = '🙄' }: { name?: string, defaultValue?: string }
) => {
  const [showPicker, setShowPicker] = useState(false);
  const [emoji, setEmoji] = useState(defaultValue);
  const hiddenInput = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const emojiesPanel = useRef<HTMLDivElement>(null);

  const handleEmojiSelect = (emoji: string) => {

    if( buttonRef.current && hiddenInput.current ) {
      buttonRef.current.querySelector('span')?.classList.remove('grayscale');
      buttonRef.current.innerText = emoji;
      setEmoji(emoji);
    }
    setShowPicker(false);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setShowPicker(!showPicker);
  };

  useEffect(() => {

    if ( defaultValue === '🙄' ) {
      buttonRef.current?.querySelector('span')?.classList.add('grayscale');
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (emojiesPanel.current && !emojiesPanel.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative' ref={emojiesPanel}>
      <input ref={hiddenInput} type='hidden' name={inputName} value={emoji} />
      <button
        title='Select emoji'
        ref={buttonRef}
        onClick={handleButtonClick}
        className='p-2 text-2xl rounded-xl border border-slate-300 hover:bg-slate-700'>
          <span className='grayscale'>{defaultValue}</span>
      </button>

      {showPicker && (
        <div role='list' className='absolute right-0 border border-slate-300/20 mt-1 bg-slate-800/95 shadow-xl rounded-xl p-2 w-64 grid grid-cols-5 whitespace-nowrap'>
          {emojis.map((emoji, index) => (
            <span
              key={index} tabIndex={0} role='listitem'
              className='block text-2xl p-2 cursor-pointer rounded-xl hover:bg-slate-700'
              onClick={() => handleEmojiSelect(emoji)}
            >
              {emoji}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;