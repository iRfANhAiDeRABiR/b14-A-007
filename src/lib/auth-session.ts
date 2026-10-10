import { headers } from "next/headers";
import { auth, type AuthSession } from "@/lib/auth";

export async function getServerSession(): Promise<AuthSession | null> {
  if (!process.env.MONGODB_URI?.trim()) {
    return null;
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
    return session ?? null;
  } catch {
    return null;
  }
}
