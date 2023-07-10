// import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest } from 'next/server'


export async function GET(req: NextRequest) {

	const body = await req.text()
	console.log('body:', body)

	const { searchParams } = new URL(req.url)
	console.log( searchParams.get('x') )

	// Accessing cookies
	// const cookies = req.cookies.get('mySession')
	// console.log(cookies)
	// console log is { name: 'mySession', value: 'xyz' }
	
	// Accessing headers
	// req.headers.get('Authorization')

	return new Response(JSON.stringify({ name: 'John Doe by POST request' }), {
		headers: { 'Content-Type': 'application/json' },
		status: 200
	})
}

export async function POST(req: NextRequest) {

	const body = await req.json()
	console.log(body)

	return new Response(JSON.stringify(body), {
		headers: { 'Content-Type': 'application/json' },
		status: 200
	})
}


// export default function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
	
// 	// if( req.method !== 'GET' )
// 		// return res.status(405).json({ message: 'Method not allowed' })
	
// 	res.status(200).json({ name: 'John Doe' })
// }