const BENGALI_TO_ASCII_DIGITS: Record<string, string> = {
  "০": "0",
  "১": "1",
  "২": "2",
  "৩": "3",
  "৪": "4",
  "৫": "5",
  "৬": "6",
  "৭": "7",
  "৮": "8",
  "৯": "9",
};

export function parseLocalizedNumber(value: unknown): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const asciiNormalized = trimmed
    .replace(/[০-৯]/g, (digit) => BENGALI_TO_ASCII_DIGITS[digit] ?? digit)
    .replace(/,/g, "")
    .replace(/[^\d.-]/g, "");

  if (
    !asciiNormalized ||
    asciiNormalized === "-" ||
    asciiNormalized === "." ||
    asciiNormalized === "-."
  ) {
    return null;
  }

  const parsed = Number(asciiNormalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export function formatBengaliNumber(
  value: number | string | null | undefined,
  options?: Intl.NumberFormatOptions
): string | null {
  const numeric = parseLocalizedNumber(value);
  if (numeric === null) {
    return null;
  }

  return new Intl.NumberFormat("bn-BD", options).format(numeric);
}

export function formatBengaliPrice(
  value: number | string | null | undefined
): string | null {
  const formatted = formatBengaliNumber(value, {
    maximumFractionDigits: 2,
  });

  if (!formatted) {
    return null;
  }

  return `${formatted} টাকা`;
}

export function formatBengaliPercentage(
  value: number | string | null | undefined
): string | null {
  const numeric = parseLocalizedNumber(value);
  if (numeric === null) {
    return null;
  }

  const absValue = Math.abs(numeric);
  const hasFraction = !Number.isInteger(absValue);
  const formatted = new Intl.NumberFormat("bn-BD", {
    minimumFractionDigits: absValue === 0 || hasFraction ? 1 : 0,
    maximumFractionDigits: 1,
  }).format(absValue);

  return `${formatted}%`;
}

const UNIT_FULL_MAP: Record<string, string> = {
  kg: "প্রতি কেজি",
  kilogram: "প্রতি কেজি",
  কেজি: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  liter: "প্রতি লিটার",
  লিটার: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  ডজন: "প্রতি ডজন",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
  পিস: "প্রতি পিস",
  hali: "প্রতি হালি",
  হালি: "প্রতি হালি",
};

const UNIT_SHORT_MAP: Record<string, string> = {
  kg: "কেজি",
  kilogram: "কেজি",
  কেজি: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  লিটার: "লিটার",
  dozen: "ডজন",
  ডজন: "ডজন",
  piece: "পিস",
  pcs: "পিস",
  পিস: "পিস",
  hali: "হালি",
  হালি: "হালি",
};

export function formatBengaliUnit(rawUnit: unknown): string {
  if (typeof rawUnit !== "string" || !rawUnit.trim()) {
    return "প্রতি একক";
  }

  const normalized = rawUnit.trim().toLowerCase();
  if (UNIT_FULL_MAP[normalized]) {
    return UNIT_FULL_MAP[normalized];
  }

  if (rawUnit.trim().startsWith("প্রতি")) {
    return rawUnit.trim();
  }

  return `প্রতি ${rawUnit.trim()}`;
}

export function formatBengaliShortUnit(rawUnit: unknown): string {
  if (typeof rawUnit !== "string" || !rawUnit.trim()) {
    return "একক";
  }

  const normalized = rawUnit.trim().toLowerCase();
  if (UNIT_SHORT_MAP[normalized]) {
    return UNIT_SHORT_MAP[normalized];
  }

  return rawUnit.trim().replace(/^প্রতি\s+/, "");
}
