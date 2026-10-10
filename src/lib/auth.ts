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

function getAuthBaseUrl(): string {
  const configuredUrl = process.env.BETTER_AUTH_URL?.trim();
  if (configuredUrl) {
    return configuredUrl;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "Missing required environment variable: BETTER_AUTH_URL in production."
    );
  }

  return "http://localhost:3000";
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
    minPasswordLength: 6,
    maxPasswordLength: 128,
  },
  socialProviders: buildSocialProviders(),
  plugins: [nextCookies()],
});

export type AuthSession = typeof auth.$Infer.Session;
export type AuthUser = typeof auth.$Infer.Session.user;
