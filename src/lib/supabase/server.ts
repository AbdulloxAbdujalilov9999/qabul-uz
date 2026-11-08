import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// One client per request, bound to that request's auth cookies, so every
// query runs as the signed-in user and respects RLS. Server Components can't
// write cookies, so the catch there is intentional: middleware.ts is what
// actually refreshes the session cookie on each request.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // called from a Server Component -- middleware handles refresh
          }
        },
      },
    }
  );
}
