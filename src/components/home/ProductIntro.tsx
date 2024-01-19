import { Hero, ExampleHabit, ShadowHabit, Stats, GithubStar } from "@/components/home"

function ProductIntro() {
  return (
    <>
      <div className="mx-auto max-w-md sm:max-w-lg text-center">
        <Hero />
        <ul className="my-5 grid gap-2">
          <ExampleHabit habit={{name:'Exercise for 30 mins', repeatPattern: 'Every Morning', emoji: '🏋️', status: 'Done'}} />
          <ExampleHabit habit={{name:'Drink Water', repeatPattern: 'Daily', emoji: '🥛', status: 'Check-in'}} />
          {Array.from({ length: 3 }).map((_, i) => (
            <ShadowHabit key={i} />
          ))}
        </ul>
        <div className="mt-14">
          <h2 className="text-gray-600 sm:text-xl">StreakUp source code is available on GitHub - feel free to read, review, or contribute to it however you want!</h2>
          <div className="flex items-center justify-center py-10">
            <GithubStar repo='rezahedi/streakup-nextjs-prisma' />
          </div>
        </div>
      </div>
      <Stats />
    </>
  )
}

export default ProductIntro