import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Redirect to login if there's no session
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Assuming role is stored in session.user.user_metadata.role
  // Adjust this path as needed based on your application's user role storage
  const role = session.user.user_metadata.role

  // Define accessible roles for each path
  const roleAccess = {
    "/dashboard": ["user"], // Example roles allowed to access dashboard
    "/admin": ["admin"], // Only admin role can access admin routes
  }

  // Determine the path attempting to be accessed
  const path = new URL(req.url).pathname

  // Check if user's role is allowed to access the current path
  const isAllowedAccess = Object.entries(roleAccess).some(([key, roles]) => {
    return path.startsWith(key) && roles.includes(role)
  })

  if (!isAllowedAccess) {
    // Redirect to an unauthorized page or dashboard if user role is not permitted
    return NextResponse.redirect(new URL("/", req.url))
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
}
