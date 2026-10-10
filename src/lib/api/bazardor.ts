import type { CategoryItem, MarketProduct } from "@/types/market";
import {
  normalizeCategories,
  normalizeCategory,
  normalizeProduct,
  normalizeProducts,
} from "@/lib/utils/prices";

const PRIMARY_API_BASE_URL =
  process.env.BAZARDOR_API_BASE_URL?.trim() ||
  "https://openapi.programming-hero.com/api/bazardor";

const FALLBACK_API_BASE_URLS = [
  "https://api.abcz.workers.dev/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
];

const MARKET_REVALIDATE_SECONDS = 300;
const REQUEST_TIMEOUT_MS = 8000;

function getCandidateBaseUrls(): string[] {
  const uniqueUrls = new Set<string>([
    PRIMARY_API_BASE_URL.replace(/\/+$/, ""),
    ...FALLBACK_API_BASE_URLS.map((url) => url.replace(/\/+$/, "")),
  ]);
  return Array.from(uniqueUrls);
}

function extractArrayPayload(payload: unknown): unknown[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    Array.isArray((payload as { data: unknown }).data)
  ) {
    return (payload as { data: unknown[] }).data;
  }

  throw new Error("Expected an array payload from BazarDor API");
}

function extractObjectPayload(payload: unknown): Record<string, unknown> {
  if (payload && typeof payload === "object" && !Array.isArray(payload)) {
    if (
      "data" in payload &&
      (payload as { data: unknown }).data &&
      typeof (payload as { data: unknown }).data === "object" &&
      !Array.isArray((payload as { data: unknown }).data)
    ) {
      return (payload as { data: Record<string, unknown> }).data;
    }
    return payload as Record<string, unknown>;
  }

  throw new Error("Expected an object payload from BazarDor API");
}

async function fetchFromBazarDorApi(
  endpointPath: string,
  options?: { allow404?: boolean }
): Promise<{ status: number; data: unknown }> {
  const normalizedPath = endpointPath.startsWith("/")
    ? endpointPath
    : `/${endpointPath}`;
  const bases = getCandidateBaseUrls();
  let lastError: Error | null = null;

  for (const baseUrl of bases) {
    const url = `${baseUrl}${normalizedPath}`;

    try {
      const response = await fetch(url, {
        next: { revalidate: MARKET_REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        headers: {
          Accept: "application/json",
        },
      });

      if (response.status === 404 && options?.allow404) {
        return { status: 404, data: null };
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} from ${url}`);
      }

      const contentType = response.headers.get("content-type") ?? "";
      const text = await response.text();

      if (
        !contentType.includes("application/json") &&
        text.trim().startsWith("<")
      ) {
        throw new Error(`Non-JSON HTML response received from ${url}`);
      }

      const parsed: unknown = JSON.parse(text);
      return { status: response.status, data: parsed };
    } catch (error) {
      lastError =
        error instanceof Error
          ? error
          : new Error("Unknown error fetching from BazarDor API");
    }
  }

  throw (
    lastError ??
    new Error(`Failed to fetch ${normalizedPath} from all BazarDor API bases`)
  );
}

export async function getAllProducts(): Promise<MarketProduct[]> {
  const { data } = await fetchFromBazarDorApi("/products");
  const rawList = extractArrayPayload(data);
  return normalizeProducts(rawList);
}

export async function getAllCategories(): Promise<CategoryItem[]> {
  const { data } = await fetchFromBazarDorApi("/categories");
  const rawList = extractArrayPayload(data);
  return normalizeCategories(rawList);
}

export async function getProductsByCategory(
  categorySlug: string
): Promise<MarketProduct[]> {
  const cleanSlug = encodeURIComponent(categorySlug.trim());
  const { data } = await fetchFromBazarDorApi(
    `/products?category=${cleanSlug}`
  );
  const rawList = extractArrayPayload(data);
  return normalizeProducts(rawList);
}

export async function getCategoryBySlug(
  categorySlug: string
): Promise<CategoryItem | null> {
  const cleanSlug = encodeURIComponent(categorySlug.trim());
  const { status, data } = await fetchFromBazarDorApi(
    `/categories/${cleanSlug}`,
    { allow404: true }
  );

  if (status === 404 || data === null) {
    return null;
  }

  const rawObject = extractObjectPayload(data);
  return normalizeCategory(rawObject);
}

export async function getProductById(
  idOrSlug: string | number
): Promise<MarketProduct | null> {
  const identifier = String(idOrSlug).trim();
  if (!identifier) {
    return null;
  }

  if (/^\d+$/.test(identifier)) {
    const { status, data } = await fetchFromBazarDorApi(
      `/products/${encodeURIComponent(identifier)}`,
      { allow404: true }
    );

    if (status === 404 || data === null) {
      return null;
    }

    const rawObject = extractObjectPayload(data);
    return normalizeProduct(rawObject);
  }

  const allProducts = await getAllProducts();
  return (
    allProducts.find(
      (product) => product.slug === identifier || product.id === identifier
    ) ?? null
  );
}

