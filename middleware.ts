import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextURL } from "next/dist/server/web/next-url";

export async function middleware(req: NextRequest) {

    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET});

    if(req.nextUrl.pathname === '/admin') {
        
        const reqPage = req.nextUrl.pathname;
        //copy all the url
        if(!session){
        const url = req.nextUrl.clone();
        url.pathname = `/auth/login`
        url.search = `p=${ reqPage }`
    }
    const validRoles = ['admin', 'superadmin', 'SEO'];
    
    if(!validRoles.includes(session?.user?.role)) {
        return NextResponse.rewrite(new URL('/', req.url));
    }
    
}

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
    matcher:['/checkout/address', '/checkout/summary', '/admin']
}