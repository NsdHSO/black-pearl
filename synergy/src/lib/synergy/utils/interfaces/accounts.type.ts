import { Icon } from './icon.type';

export interface Account {
  IBAN: string;
  currency: string;
  amount: number;
  icons: Icon[];
}
