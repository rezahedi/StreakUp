import { Suspense } from "react"
import { TodayCard, TomorrowCard, BrokenCard } from '@/app/ui'
import { TodaySkeleton } from "@/app/ui/skeletons"
import { ProductIntro } from "@/components/home";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import { updateHabits } from "./lib/actions";
import SubHeader from "@/components/templates/SubHeader";

export default async function page()
{
  // Get user session token
  const session = await getServerSession(authOptions);
  if (!session || !session.user)
    return <ProductIntro />;

  // TODO: before getting list of habits, update all missed checkins
  await updateHabits(session.user);

  return (
    <>
      <SubHeader />
      <div className="mx-auto lg:max-w-screen-xl px-2.5 lg:px-20">
        <h2>Today</h2>
        <Suspense fallback={<TodaySkeleton />}>
          <TodayCard />
        </Suspense>
        <h2>Tomorrow</h2>
        <Suspense fallback={<TodaySkeleton />}>
          <TomorrowCard />
        </Suspense>
        <h2>Broken</h2>
        <Suspense fallback={<TodaySkeleton />}>
          <BrokenCard />
        </Suspense>
      </div>
    </>
  )
}
