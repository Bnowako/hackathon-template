// Read more about middleware here: https://nextjs.org/docs/app/building-your-application/routing/middleware
import { NextRequest, NextResponse } from "next/server";


const PROXY_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.10xeasier.com"
    : "http://localhost:8000";



export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const url = new URL(request.url);
    const targetUrl = new URL(url.pathname + url.search, PROXY_URL);
    return NextResponse.rewrite(targetUrl);
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
