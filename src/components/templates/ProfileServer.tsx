import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import Image from "next/image";

export default async function ProfileServer () {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <div>
        <a className="animate-fade-in rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black" href="/signin">Sign In</a>
      </div>
    );
  }

  const { user } = session;

  return (
    <div>
      <a href="/api/auth/signout" className="flex gap-2 items-center">
        {user.name}
        {user.image && <Image src={user.image} alt='Profile' width={34} height={34} />}
      </a>
    </div>
  )
}
