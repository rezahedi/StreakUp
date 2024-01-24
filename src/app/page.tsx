import { Dashboard } from '@/app/ui'
import { ProductIntro } from "@/components/home";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import { updateHabits } from "./lib/actions";

export default async function page()
{
  // Get user session token
  const session = await getServerSession(authOptions);
  if (!session || !session.user)
    return <ProductIntro />;

  // TODO: before getting list of habits, update all missed checkins
  await updateHabits(session.user);

  return (
    <Dashboard />
  )
}
