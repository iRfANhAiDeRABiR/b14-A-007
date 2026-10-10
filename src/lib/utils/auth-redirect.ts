const DISALLOWED_AUTH_PATHS = ["/signin", "/signup", "/api/auth"];

export function resolveSafeCallbackUrl(
  rawUrl?: string | string[] | null
): string {
  if (!rawUrl || Array.isArray(rawUrl)) {
    return "/";
  }

  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return "/";
  }

  if (!trimmed.startsWith("/") || trimmed.startsWith("//") || trimmed.includes("\\")) {
    return "/";
  }

  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed)) {
    return "/";
  }

  try {
    const base = new URL("http://localhost");
    const resolved = new URL(trimmed, base);

    if (resolved.origin !== base.origin) {
      return "/";
    }

    const normalizedPathname = resolved.pathname.toLowerCase();
    for (const blockedPath of DISALLOWED_AUTH_PATHS) {
      if (
        normalizedPathname === blockedPath ||
        normalizedPathname.startsWith(`${blockedPath}/`)
      ) {
        return "/";
      }
    }

    return `${resolved.pathname}${resolved.search}${resolved.hash}`;
  } catch {
    return "/";
  }
}

export function buildAuthPageHref(
  basePath: "/signin" | "/signup",
  callbackUrl?: string | null
): string {
  const safeCallback = resolveSafeCallbackUrl(callbackUrl);
  if (safeCallback === "/") {
    return basePath;
  }

  const params = new URLSearchParams({ callbackUrl: safeCallback });
  return `${basePath}?${params.toString()}`;
}

export function buildProtectedSignInRedirectUrl(rawTargetPath: string): string {
  const safeCallback = resolveSafeCallbackUrl(rawTargetPath);
  const params = new URLSearchParams({
    callbackUrl: safeCallback,
    reason: "auth_required",
  });
  return `/signin?${params.toString()}`;
}


