import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET});
    // console.log({session})
    if(!session) {
        const reqPage = req.nextUrl.pathname;
        //copy all the url
        const url = req.nextUrl.clone();
        url.pathname = `/auth/login`
        url.search = `p=${ reqPage }`
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher:['/checkout/address', '/checkout/summary']
}