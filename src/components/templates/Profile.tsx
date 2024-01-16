"use client";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Skeleton from "react-loading-skeleton";

export default function Profile() {
  const {data: session, status} = useSession();

  const handleSignin = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    signIn();
  }

  const handleSignout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    signOut();
  }

  // Loading state
  if (status === "loading") return <Skeleton width={100} />;

  // Signed out state
  if ( !session || !session.user ) {
    return (
      <a href="/api/auth/signin" onClick={handleSignin} className="flex gap-2 items-center">
        Signin
        <svg
          className="w-6 h-6 rounded-full hover:bg-slate-700 grayscale"
          fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
        </svg>
      </a>
    );
  }

  // Signed in state
  const { user } = session;
  return (
    <a href="/api/auth/signout" onClick={handleSignout} className="flex gap-2 items-center">
      {user.name}
      <Image src={
        user.image ||
        `https://avatars.dicebear.com/api/micah/${session?.user?.name}.svg`
      } alt='Profile' width={34} height={34} />
    </a>
  )
}
