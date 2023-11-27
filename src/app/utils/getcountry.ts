
import { verifyJwt } from "@/app/lib/jwt";
import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"



export async function getCountryInfo(countryName: string): Promise<any> {
    
    // const session = await getServerSession(options);
    // const accessToken = session?.user?.accessToken;
    // if (!accessToken || !verifyJwt(accessToken)) {
    //     return new Response(
    //     JSON.stringify({
    //         error: "unauthorized",
    //     }),
    //     {
    //         status: 401,
    //     }
    //     );
    // }
    
    try {

        const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        if (res.status === 404) {
            throw new Error(`No country with the name ${countryName}`);
        } else if (!res.ok) {
            throw new Error(`Error fetching data for ${countryName}`);
        } else {
            const data = await res.json();
            return { data, error: null };
        }
        } catch (error) {
            console.error(error);
        return { data: null, error: error };
        }
  }
  