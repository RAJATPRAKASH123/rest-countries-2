'use client'
import Image from "next/image";
import {User} from "next-auth";
import { useState } from "react";
import Link from "next/link";

// type User = {
//     name?: string | null | undefined;
//     email?: string | null | undefined;
//     image?: string | null | undefined;
// } | undefined


type Props = {
    user: User,
    pagetype: string,
}


export default function Card({ user, pagetype }: Props) {

    const [isOpen, setIsOpen] = useState(false);

    function toggleButton(){
        console.log("hahah");
        setIsOpen(isOpen => !isOpen);
        console.log("hapa", isOpen);
    }

    const greeting = user?.name ? (
        <div className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
            Hello {user?.name}!
        </div>
    ) : null

    const userImage = user?.image ? (
        <Image
            className="h-8 w-8 rounded-circle"
            src={user?.image}
            width={20}
            height={200}
            alt={user?.name ?? "Profile Pic"}
            priority={true}
        />
    ) : <h1 className="">{String.fromCodePoint(0x1F60E)}</h1> 
    // ont-size:5rem;width:100%;text-align:center;

    return (
        <>
            <ul className="flex justify-evenly text-2xl font-bold">
                <li>
                <button
                    id="dropdownInformationButton"
                    data-dropdown-toggle="dropdownInformation"
                    className="text-white focus:outline-none focus:bg-emerald-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                    type="button"
                    onClick={() => toggleButton()}
                    >
                    {userImage}
                </button>
                </li>
                {isOpen && 
                (                
                    <div
                        id="dropdownInformation"
                        className=" bg-gray-300 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                    >

                        <div className="bg-emarald-900 px-4 py-3 text-sm text-gray-900 dark:text-white">
                            <div>{user?.name}</div>
                            <div className="font-medium truncate">{user?.email}</div>
                        </div>

                    </div>
                    )}
            </ul>
    </>
    )
}