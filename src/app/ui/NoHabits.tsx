import Image from 'next/image'

export default function NoHabits() {
  return (
    <div className="flex flex-col items-center text-green-500 py-10">
      <Image src="/images/allset.gif" alt='all set' className='rounded-xl mb-2 w-auto h-auto' width={450} height={250} priority />
      <p>You are all set for now!</p>
    </div>
  )
}
