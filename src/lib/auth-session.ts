import { headers } from "next/headers";
import { auth, type AuthSession } from "@/lib/auth";

export async function getServerSession(): Promise<AuthSession | null> {
  if (!process.env.MONGODB_URI?.trim()) {
    return null;
  }

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session ?? null;
  } catch {
    return null;
  }
}
