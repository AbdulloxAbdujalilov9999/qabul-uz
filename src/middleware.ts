import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Refreshes the Supabase auth cookie on every request. Without this, a
// Server Component's cookie writes get silently dropped (see server.ts) and
// sessions would expire client-side even though they're still valid.
export async function middleware(request: NextRequest) {
  // Next.js auto-prefetches every visible Link, including nav items the user
  // never clicks. Letting those invisible requests through here is pure
  // waste at best, and multiplies calls to Supabase's auth API at worst --
  // so skip the session check entirely and pass them straight through.
  if (request.headers.get("next-router-prefetch")) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    }
  );

  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
