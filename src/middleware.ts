// export {default} from "next-auth/middleware";


// /configuration/nextjs#advanced-usage
import {withAuth} from "next-auth/middleware"
import type {NextRequestWithAuth} from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
    // withAuth augments the Request with user's token
    function middleware(request: NextRequestWithAuth){
        console.log(request.nextUrl.pathname);
        console.log(request.nextauth.token);
        if (request.nextUrl.pathname.startsWith("/client") &&
            request.nextauth.token?.role !== "admin" &&
            request.nextauth.token?.role !== "manager"){
                return NextResponse.rewrite(
                    new URL("/denied", request.url)
                )
        }
    },
    {
        callbacks: {
            // authorized: ({token}) => token?.role === "admin"
            authorized: ({token}) => !!token
        },
    }   
)

// Now, it can be configured for multiple roles -

export const config = {matcher:['/client']} // can be regex