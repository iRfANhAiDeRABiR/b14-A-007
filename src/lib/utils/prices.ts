import type {
  CategoryItem,
  MarketEntry,
  MarketProduct,
  PriceDirection,
  ProductDetail,
  ProductPriceSummary,
  RawApiCategory,
  RawApiMarketEntry,
  RawApiProduct,
  TickerProductItem,
} from "@/types/market";
import {
  formatBengaliNumber,
  formatBengaliShortUnit,
  formatBengaliUnit,
  parseLocalizedNumber,
} from "./bengali";

function toNonEmptyString(value: unknown): string | null {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }
  return null;
}

function normalizeDirection(
  rawDir: unknown,
  parsedPct: number | null,
  todayPrice: number | null,
  yesterdayPrice: number | null
): { direction: PriceDirection; changePercent: number | null } {
  const dirText =
    typeof rawDir === "string" ? rawDir.trim().toLowerCase() : null;

  if (dirText === "up" || dirText === "increase" || dirText === "rise") {
    return {
      direction: "up",
      changePercent: parsedPct !== null ? Math.abs(parsedPct) : null,
    };
  }

  if (dirText === "down" || dirText === "decrease" || dirText === "fall") {
    return {
      direction: "down",
      changePercent: parsedPct !== null ? Math.abs(parsedPct) : null,
    };
  }

  if (dirText === "flat" || dirText === "unchanged" || dirText === "same") {
    return {
      direction: "unchanged",
      changePercent: parsedPct !== null ? Math.abs(parsedPct) : 0,
    };
  }

  if (parsedPct !== null) {
    if (parsedPct > 0) {
      return { direction: "up", changePercent: Math.abs(parsedPct) };
    }
    if (parsedPct < 0) {
      return { direction: "down", changePercent: Math.abs(parsedPct) };
    }
    return { direction: "unchanged", changePercent: 0 };
  }

  if (
    todayPrice !== null &&
    yesterdayPrice !== null &&
    yesterdayPrice > 0
  ) {
    const diff = todayPrice - yesterdayPrice;
    const computedPct = Number(
      ((Math.abs(diff) / yesterdayPrice) * 100).toFixed(1)
    );
    if (diff > 0) {
      return { direction: "up", changePercent: computedPct };
    }
    if (diff < 0) {
      return { direction: "down", changePercent: computedPct };
    }
    return { direction: "unchanged", changePercent: 0 };
  }

  return { direction: "unknown", changePercent: null };
}

function normalizeMarketEntry(raw: RawApiMarketEntry): MarketEntry | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const market = toNonEmptyString(raw.market);
  if (!market) {
    return null;
  }

  const division = toNonEmptyString(raw.division) ?? "";
  const min = parseLocalizedNumber(raw.min);
  const max = parseLocalizedNumber(raw.max);

  let average: number | null = null;
  if (min !== null && max !== null) {
    average = Number(((min + max) / 2).toFixed(2));
  } else if (min !== null) {
    average = min;
  } else if (max !== null) {
    average = max;
  }

  return {
    market,
    division,
    min,
    max,
    average,
  };
}

export function normalizeProduct(raw: unknown): MarketProduct | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const item = raw as RawApiProduct;
  const id = toNonEmptyString(item.id);
  const slug = toNonEmptyString(item.slug) ?? id;
  const name = toNonEmptyString(item.nameBn) ?? toNonEmptyString(item.name);

  if (!id || !slug || !name) {
    return null;
  }

  const emoji =
    toNonEmptyString(item.image) ??
    toNonEmptyString(item.emoji) ??
    toNonEmptyString(item.categoryIcon);

  const categorySlug = toNonEmptyString(item.category);
  const categoryName = toNonEmptyString(item.categoryNameBn);
  const categoryIcon = toNonEmptyString(item.categoryIcon);
  const rawUnit = toNonEmptyString(item.unit) ?? "";

  const currentPrice = parseLocalizedNumber(item.today);
  const yesterdayPrice = parseLocalizedNumber(item.yesterday);
  const lastWeekPrice = parseLocalizedNumber(item.lastWeek);
  const lastMonthPrice = parseLocalizedNumber(item.lastMonth);

  const rawPct = parseLocalizedNumber(item.change?.pct);
  const { direction, changePercent } = normalizeDirection(
    item.change?.dir,
    rawPct,
    currentPrice,
    yesterdayPrice
  );

  const markets: MarketEntry[] = Array.isArray(item.markets)
    ? item.markets
        .map((entry) => normalizeMarketEntry(entry))
        .filter((entry): entry is MarketEntry => entry !== null)
    : [];

  return {
    id,
    slug,
    name,
    emoji,
    categorySlug,
    categoryName,
    categoryIcon,
    rawUnit,
    unit: formatBengaliUnit(rawUnit),
    shortUnit: formatBengaliShortUnit(rawUnit),
    currentPrice,
    yesterdayPrice,
    lastWeekPrice,
    lastMonthPrice,
    changePercent,
    direction,
    markets,
  };
}

export function normalizeProducts(rawList: unknown[]): MarketProduct[] {
  const seenIds = new Set<string>();
  const normalized: MarketProduct[] = [];

  for (const rawItem of rawList) {
    const product = normalizeProduct(rawItem);
    if (product && !seenIds.has(product.id)) {
      seenIds.add(product.id);
      normalized.push(product);
    }
  }

  return normalized;
}

export function normalizeCategory(raw: unknown): CategoryItem | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const item = raw as RawApiCategory;
  const slug = toNonEmptyString(item.slug) ?? toNonEmptyString(item.id);
  const name = toNonEmptyString(item.nameBn) ?? toNonEmptyString(item.name);

  if (!slug || !name) {
    return null;
  }

  const id = toNonEmptyString(item.id) ?? slug;
  const icon = toNonEmptyString(item.icon) ?? undefined;

  return {
    id,
    slug,
    name,
    icon,
  };
}

export function normalizeCategories(rawList: unknown[]): CategoryItem[] {
  const seenSlugs = new Set<string>();
  const normalized: CategoryItem[] = [];

  for (const rawItem of rawList) {
    const category = normalizeCategory(rawItem);
    if (category && !seenSlugs.has(category.slug)) {
      seenSlugs.add(category.slug);
      normalized.push(category);
    }
  }

  return normalized;
}

export function getTopPriceRisers(
  products: MarketProduct[],
  limit = 6
): MarketProduct[] {
  return products
    .filter(
      (product) =>
        product.direction === "up" &&
        product.changePercent !== null &&
        Math.abs(product.changePercent) > 0
    )
    .sort(
      (a, b) =>
        Math.abs(b.changePercent ?? 0) - Math.abs(a.changePercent ?? 0)
    )
    .slice(0, limit);
}

export function getTopPriceFallers(
  products: MarketProduct[],
  limit = 6
): MarketProduct[] {
  return products
    .filter(
      (product) =>
        product.direction === "down" &&
        product.changePercent !== null &&
        Math.abs(product.changePercent) > 0
    )
    .sort(
      (a, b) =>
        Math.abs(b.changePercent ?? 0) - Math.abs(a.changePercent ?? 0)
    )
    .slice(0, limit);
}

export function toTickerItems(products: MarketProduct[]): TickerProductItem[] {
  return products
    .filter((product) => product.currentPrice !== null)
    .map((product) => ({
      id: product.id,
      slug: product.slug,
      name: product.name,
      emoji: product.emoji,
      price: product.currentPrice,
      unit: product.shortUnit,
      changePercent: product.changePercent,
      direction: product.direction,
    }));
}

export function sortProductsByPrice(
  products: readonly MarketProduct[],
  sortOption: import("@/types/market").SortOption
): MarketProduct[] {
  if (sortOption === "default") {
    return [...products];
  }

  return products
    .map((product, index) => ({
      product,
      index,
      numericPrice: parseLocalizedNumber(product.currentPrice),
    }))
    .sort((a, b) => {
      if (a.numericPrice === null && b.numericPrice === null) {
        return a.index - b.index;
      }
      if (a.numericPrice === null) {
        return 1;
      }
      if (b.numericPrice === null) {
        return -1;
      }

      const diff =
        sortOption === "price-low-high"
          ? a.numericPrice - b.numericPrice
          : b.numericPrice - a.numericPrice;

      if (diff !== 0) {
        return diff;
      }

      return a.index - b.index;
    })
    .map((entry) => entry.product);
}

export function calculateProductPriceSummary(
  markets: readonly MarketEntry[]
): ProductPriceSummary {
  let minPrice: number | null = null;
  let maxPrice: number | null = null;
  let lowestMarketName: string | null = null;
  let highestMarketName: string | null = null;
  const validAverages: number[] = [];

  for (const entry of markets) {
    const candidateMin = entry.min ?? entry.max;
    const candidateMax = entry.max ?? entry.min;

    if (
      candidateMin !== null &&
      Number.isFinite(candidateMin) &&
      candidateMin > 0
    ) {
      if (minPrice === null || candidateMin < minPrice) {
        minPrice = candidateMin;
        lowestMarketName = entry.market;
      }
    }

    if (
      candidateMax !== null &&
      Number.isFinite(candidateMax) &&
      candidateMax > 0
    ) {
      if (maxPrice === null || candidateMax > maxPrice) {
        maxPrice = candidateMax;
        highestMarketName = entry.market;
      }
    }

    if (
      entry.average !== null &&
      Number.isFinite(entry.average) &&
      entry.average > 0
    ) {
      validAverages.push(entry.average);
    }
  }

  const averagePrice =
    validAverages.length > 0
      ? Math.round(
          validAverages.reduce((sum, val) => sum + val, 0) /
            validAverages.length
        )
      : null;

  return {
    minPrice,
    maxPrice,
    averagePrice,
    lowestMarketName,
    highestMarketName,
  };
}

function buildProductDescription(product: MarketProduct): string {
  if (product.currentPrice !== null && product.yesterdayPrice !== null) {
    const diff = Number(
      Math.abs(product.currentPrice - product.yesterdayPrice).toFixed(2)
    );
    const formattedDiff = formatBengaliNumber(diff, {
      maximumFractionDigits: 2,
    });

    if (diff > 0 && formattedDiff) {
      if (product.currentPrice > product.yesterdayPrice) {
        return `গতকালের তুলনায় আজ দাম বেড়েছে · ${formattedDiff} টাকা`;
      }
      return `গতকালের তুলনায় আজ দাম কমেছে · ${formattedDiff} টাকা`;
    }

    return "গতকালের তুলনায় আজ দাম অপরিবর্তিত রয়েছে";
  }

  return "পণ্যটির বর্তমান বাজারদর ও বাজারভিত্তিক তথ্য।";
}

export function toProductDetail(product: MarketProduct): ProductDetail {
  const sortedMarkets = [...product.markets].sort((a, b) => {
    const avgA = a.average ?? a.min ?? a.max;
    const avgB = b.average ?? b.min ?? b.max;
    if (avgA === null && avgB === null) return 0;
    if (avgA === null) return 1;
    if (avgB === null) return -1;
    return avgA - avgB;
  });

  return {
    ...product,
    markets: sortedMarkets,
    description: buildProductDescription(product),
    priceSummary: calculateProductPriceSummary(sortedMarkets),
  };
}
