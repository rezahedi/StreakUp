import Link from 'next/link'


export default function Header({ children }) {
	return (
		<header className="flex justify-between items-center mb-8">
			<h1 className="text-3xl"><Link href="/">Streak<span className='text-orange-500'>Up</span></Link></h1>
			{children}
		</header>
	)
}
