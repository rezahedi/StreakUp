import { DashboardCard } from '@/app/ui'
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import { updateHabits } from "@/app/lib/actions";
import { redirect } from 'next/navigation';

export default async function page()
{
  // Get user session token
  const session = await getServerSession(authOptions);
  if (!session || !session.user)
    redirect('/');

  // Update all missed checkins as broken
  await updateHabits(session.user);

  return (
    <DashboardCard />
  )
}
