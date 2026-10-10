export interface RawApiMarketEntry {
  market?: unknown;
  division?: unknown;
  min?: unknown;
  max?: unknown;
}

export interface RawApiPriceChange {
  dir?: unknown;
  pct?: unknown;
}

export interface RawApiProduct {
  id?: unknown;
  slug?: unknown;
  nameBn?: unknown;
  name?: unknown;
  category?: unknown;
  categoryNameBn?: unknown;
  categoryIcon?: unknown;
  unit?: unknown;
  image?: unknown;
  emoji?: unknown;
  today?: unknown;
  yesterday?: unknown;
  lastWeek?: unknown;
  lastMonth?: unknown;
  change?: RawApiPriceChange | null;
  markets?: RawApiMarketEntry[] | null;
}

export interface RawApiCategory {
  id?: unknown;
  slug?: unknown;
  nameBn?: unknown;
  name?: unknown;
  icon?: unknown;
}

export type PriceDirection = "up" | "down" | "unchanged" | "unknown";
export type PriceChangeDirection = PriceDirection;

export interface MarketEntry {
  market: string;
  division: string;
  min: number | null;
  max: number | null;
}

export interface MarketProduct {
  id: string;
  slug: string;
  name: string;
  emoji: string | null;
  categorySlug: string | null;
  categoryName: string | null;
  categoryIcon: string | null;
  rawUnit: string;
  unit: string;
  shortUnit: string;
  currentPrice: number | null;
  yesterdayPrice: number | null;
  lastWeekPrice: number | null;
  lastMonthPrice: number | null;
  changePercent: number | null;
  direction: PriceDirection;
  markets: MarketEntry[];
}

export interface CategoryItem {
  id: string;
  slug: string;
  name: string;
  icon?: string;
}

export interface TickerProductItem {
  id: string | number;
  slug?: string;
  name: string;
  emoji: string | null;
  price: number | null;
  unit: string;
  changePercent: number | null;
  direction: PriceDirection;
}
