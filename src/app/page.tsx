// import Error from "./components/Error";
// import Countries from "./components/Countries";

import Link from "next/link";
import UserCard from "./components/UserCard";
import Countries from "./components/Countries";


import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
// import UserCard from "./components/UserCard"

export default async function Home() {
  const session = await getServerSession(options)

  return (
    <>
      { session ? (
        <>
        {/* <section className="flex flex-col gap-6">
            <UserCard user={session?.user} pagetype={"Home"} />
        </section> */}
          <Countries/>
        </>
      ) : 
        (
          <h1 className="">
            <Link href="/api/auth/signin" className="text-3xl-underline">
              Welcome to the Know the Countries!!!  to explore about countries...
            </Link>
          </h1>
        )

      }
    </>
  )
}

// export default Home;

// npm install prisma --save-dev
// npx prisma init
// npm i next-auth
// openssl rand -base64 32   oepvKeDMBjHJcF8MAk1QRt9rXtvLtG2bTgPMZZBaBLk=
// client ID - 3d93b1c8937f618f748e
// client secret - 810f1da7052f35cd2f5f0b51986ccdfcf68bddbb