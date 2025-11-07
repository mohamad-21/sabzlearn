import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function middleware(req: NextRequest) {
	const cookies = getSessionCookie(req);

	if (["/login", "/signup"].includes(req.nextUrl.basePath) && cookies) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	return NextResponse.next();

}

export const matcher = ['/((?!api|_next/static|_next/image|.*\\.png$).*)'];