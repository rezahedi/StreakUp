"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import Skeleton from "react-loading-skeleton";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
// import { ProfileDelete } from "@/components/templates";

export default function Profile() {
  const {data: session, status} = useSession();
  const router = useRouter();

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
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex gap-1 items-center px-4 py-2 rounded-md hover:bg-gray-100">
        {user.name}
        <Image className="rounded-full" src={
          user.image ||
          `https://avatars.dicebear.com/api/micah/${session?.user?.name}.svg`
        } alt='Profile' width={34} height={34} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-40 animate-fade-in rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <DropdownMenu.Item className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onSelect={() => router.push('/profile')}>
          Update Profile
        </DropdownMenu.Item>
        <DropdownMenu.Item disabled className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onSelect={() => {}}>
          Delete Account
        </DropdownMenu.Item>
        <DropdownMenu.Item className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onSelect={() => signOut()}>
          Sign out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
