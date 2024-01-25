import React from 'react'
import { Github } from '@/components/templates';

export default async function GithubStar({repo}: {repo: string}) {

  if(!repo) return (<>No Repo!</>)

  let starCount = 0;
  await fetch(`https://api.github.com/repos/${repo}`, { next: {revalidate: 86400} })
    .then((res) => res.json())
    .then((json) => {
      starCount = json.stargazers_count;
    }).catch((err) => {
      console.error(err)
    })

  return (
    <a href={`https://github.com/${repo}`} target="_blank" rel="noreferrer">
      <div className="flex items-center">
        <div className="flex h-10 items-center space-x-2 rounded-md bg-gray-800 p-4">
          <Github className="h-5 w-5 text-white" />
          <p className="font-medium text-white">Star</p>
        </div>
        <span className='rotate-45 mt-0.5 ml-0.5 -mr-3.5 w-3 h-3 block bg-gray-800'></span>
        <div className="relative flex items-center p-4 h-10 rounded-md bg-gray-800 ml-2">
          <p className="font-display font-medium text-white">{starCount}</p>
        </div>
      </div>
    </a>
  )
}
