import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

const protectedRoutes = ['/profile', '/preview'];
const publicRoutes = ['/', '/login'];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (
    isPublicRoute &&
    session?.userId &&
    !request.nextUrl.pathname.startsWith('/profile')
  ) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}