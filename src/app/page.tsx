import { Dashboard, Sidebar } from '@/app/ui'
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
      <div className='mx-auto lg:max-w-screen-xl px-2.5 lg:px-20'>
        <div className='grid grid-cols-1 gap-5 lg:grid-cols-7'>
          <Sidebar />
          <Dashboard />
        </div>
      </div>
    </>
  )
}
