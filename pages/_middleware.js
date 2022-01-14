import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  //Token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  //Allow the req if the following is true
  // (i) Its a req for next-auth session and provider fetching
  // (ii) the token exists

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  //Redirect them to login is they dont have the token and are requesting a proteted route
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
