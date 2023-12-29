export interface EconomyEntry {
  valueMoney: number;
  month: string;
}

export interface ContrastEntry {
  contrastMoney: number;
  month: string;
  valueMoney: number;
}

export interface Amount {
  economy: Iterable<{ [key: string]: number }>;
  contrastData: ContrastEntry[];
}
