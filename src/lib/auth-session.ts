import { headers } from "next/headers";
import { auth, type AuthSession } from "@/lib/auth";

export type ServerSessionResult =
  | { status: "authenticated"; session: AuthSession }
  | { status: "unauthenticated"; session: null }
  | { status: "error"; session: null };

export async function getServerSessionResult(): Promise<ServerSessionResult> {
  if (!process.env.MONGODB_URI?.trim()) {
    return { status: "error", session: null };
  }

  try {
    const incomingHeaders = await headers();
    const requestHeaders = new Headers();
    incomingHeaders.forEach((value, key) => {
      requestHeaders.set(key, value);
    });

    const session = await auth.api.getSession({
      headers: requestHeaders,
    });

    if (session?.user && session?.session) {
      return { status: "authenticated", session };
    }

    return { status: "unauthenticated", session: null };
  } catch {
    return { status: "error", session: null };
  }
}

export async function getServerSession(): Promise<AuthSession | null> {
  const result = await getServerSessionResult();
  return result.session;
}
