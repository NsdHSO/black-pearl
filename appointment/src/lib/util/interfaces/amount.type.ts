export interface EconomyEntry {
  valueMoney: number;
  month: string;
}

export interface ContrastEntry {
  month: string;
  contrast: number | null;
}

export interface Amount {
  economy: Iterable<{ [key: string]: number }>;
  contrastData: ContrastEntry[];
}
