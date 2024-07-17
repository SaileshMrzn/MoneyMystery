import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
        
    const isPublicPath = path === '/login' || path === '/verifyemail' || path==='/'
    
    const token = request.cookies.get("token")?.value || ""
    const id = request.cookies.get("id")?.value || ""
        
    if(isPublicPath && token && id){
        return NextResponse.redirect(
          new URL(`/${id}`, request.url)
        );
    }
    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
  matcher: [
    "/login",
    "/",
    "/verifyemail",
    // "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)",
    "/:userid((?!api|_next/static|_next/image|images|.*\\.png$|.*\\.jpg$).*)",
  ],
};
