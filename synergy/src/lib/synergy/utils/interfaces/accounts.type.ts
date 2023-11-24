import { Icon } from './icon.type';

export interface Account {
  IBAN: string;
  currency: string;
  amount: number;
  icon: Icon;
  configuration?: ConfigurationAccount;
}

export interface ConfigurationAccount {
  buttons: ConfigButton[];
}

export interface ConfigButton {
  visible: true;
  name: string;
  action: (event: unknown) => void;
  IBAN: string;
}
