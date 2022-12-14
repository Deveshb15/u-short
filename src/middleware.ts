import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
	if(req.method === "GET") {
		if (req.nextUrl.pathname.startsWith("/api/get-url/")) {
			console.log("returning early");
			return;
		}
	
		if(req.nextUrl.pathname === '/') {
			return
		}
	
		// console.log("PATH ", req.nextUrl.pathname);
		const slug = req.nextUrl.pathname.split("/").pop();
		// console.log(slug);
	
		if(slug && slug?.length > 0) {
			console.log("slug /", slug)
			const response = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)
			const data = await response.json()
			console.log("data? ", data)
			if(data?.url) {
				// console.log(data.url)
				return NextResponse.redirect(data.url)
			}
		}
	}
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!_next/static|fonts|favicon.ico|_error|vercel.svg).*)",
	],
};
