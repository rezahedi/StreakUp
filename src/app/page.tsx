import { ProductIntro } from "@/components/home";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import { updateHabits } from "@/app/lib/actions";

export default async function page()
{
  // Get user session token
  const session = await getServerSession(authOptions);
  if (session && session.user) {
    // Update all missed checkins as broken
    await updateHabits(session.user);
    return <ProductIntro user={session.user} />;
  }

  return <ProductIntro />;
}
