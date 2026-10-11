import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import {
  db,
  isMongoReplicaSetConfigured,
  mongoClientProxy,
} from "@/lib/mongodb";

function getValidatedAuthSecret(): string {
  const secret = process.env.BETTER_AUTH_SECRET?.trim();

  if (!secret || secret.length < 16) {
    throw new Error(
      "Missing or invalid BETTER_AUTH_SECRET. Please generate a secure secret (at least 32 characters) and configure it in .env.local."
    );
  }

  return secret;
}

function isLocalhostUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname === "localhost" ||
      parsed.hostname === "127.0.0.1" ||
      parsed.hostname === "::1"
    );
  } catch {
    return url.includes("localhost") || url.includes("127.0.0.1");
  }
}

function normalizeOriginUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim().replace(/\/+$/, "");
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

function getAuthBaseUrl(): string {
  const isProduction =
    process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL);
  const configuredUrl = process.env.BETTER_AUTH_URL?.trim();

  if (configuredUrl && (!isProduction || !isLocalhostUrl(configuredUrl))) {
    return normalizeOriginUrl(configuredUrl);
  }

  const vercelProductionUrl =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_BRANCH_URL?.trim() ||
    process.env.VERCEL_URL?.trim();

  if (vercelProductionUrl) {
    return normalizeOriginUrl(vercelProductionUrl);
  }

  if (isProduction) {
    return "https://b14-a-007-9pcg.vercel.app";
  }

  return configuredUrl
    ? normalizeOriginUrl(configuredUrl)
    : "http://localhost:3000";
}

function getTrustedOrigins(): string[] {
  const origins = new Set<string>([
    getAuthBaseUrl(),
    "https://b14-a-007-9pcg.vercel.app",
    "https://*.vercel.app",
  ]);

  const envUrls = [
    process.env.BETTER_AUTH_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_BRANCH_URL,
    process.env.VERCEL_URL,
  ];

  for (const raw of envUrls) {
    if (raw?.trim()) {
      const normalized = normalizeOriginUrl(raw);
      if (process.env.NODE_ENV !== "production" || !isLocalhostUrl(normalized)) {
        origins.add(normalized);
      }
    }
  }

  if (process.env.NODE_ENV !== "production") {
    origins.add("http://localhost:3000");
  }

  return Array.from(origins);
}

function buildSocialProviders() {
  const googleClientId = process.env.GOOGLE_CLIENT_ID?.trim();
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
  const githubClientId = process.env.GITHUB_CLIENT_ID?.trim();
  const githubClientSecret = process.env.GITHUB_CLIENT_SECRET?.trim();

  return {
    ...(googleClientId && googleClientSecret
      ? {
          google: {
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          },
        }
      : {}),
    ...(githubClientId && githubClientSecret
      ? {
          github: {
            clientId: githubClientId,
            clientSecret: githubClientSecret,
          },
        }
      : {}),
  };
}

export function getConfiguredSocialProviders(): {
  google: boolean;
  github: boolean;
} {
  const providers = buildSocialProviders();
  return {
    google: Boolean(providers.google),
    github: Boolean(providers.github),
  };
}

const useReplicaTransactions = isMongoReplicaSetConfigured();

export const auth = betterAuth({
  secret: getValidatedAuthSecret(),
  baseURL: getAuthBaseUrl(),
  trustedOrigins: getTrustedOrigins(),
  database: mongodbAdapter(
    db,
    useReplicaTransactions
      ? {
          client: mongoClientProxy,
          transaction: true,
        }
      : {
          transaction: false,
        }
  ),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  socialProviders: buildSocialProviders(),
  plugins: [nextCookies()],
});

export type AuthSession = typeof auth.$Infer.Session;
export type AuthUser = typeof auth.$Infer.Session.user;

