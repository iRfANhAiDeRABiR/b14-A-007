export interface CategoryItem {
  id?: string | number;
  slug: string;
  name: string;
  icon?: string;
}

export type PriceChangeDirection = "up" | "down" | "unchanged";

export interface TickerProductItem {
  id: string | number;
  slug?: string;
  name: string;
  emoji: string;
  price: string | number;
  unit: string;
  changePercent: string | number;
  direction: PriceChangeDirection;
}
