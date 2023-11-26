import { getServerSession } from "next-auth/next";
import Link from "next/link"

import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import UserCard from "./UserCard";

export default async function StickyNavbar() {
  const session = await getServerSession(options);

    return (
        <nav className="bg-emerald-800 p-3">
            <ul className="flex justify-evenly text-2xl font-bold">
                <li><Link href="/">Home</Link></li>
                {/* <li><Link href="/server">Look For Countries</Link></li> */}
                <li><Link href="/client">Admin</Link></li>
                {!session? (
                    <li><Link href="/api/auth/signin">Sign In</Link></li>
                  ) : 
                  (
                    <>
                      <nav className="bg-emerald-800">
                        <UserCard user={session?.user} pagetype={""}/>
                        <li><Link href="/api/auth/signout">Sign Out</Link></li>
                      </nav>
                    </>
                  )}
            </ul>
        </nav>
        
    )
}
