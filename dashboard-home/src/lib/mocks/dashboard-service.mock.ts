import { Account, ConfigButton } from 'ngx-synergy';

export function getAccountsWithIcons(): Account[] {
  return [
    {
      IBAN: 'GB29RBOS60161331926819',
      currency: 'GBP',
      amount: 1500,
      icon: {
        name: 'gbp',
        value: 'fa_brands:waze',
      },
      configuration: {
        buttons: [{ IBAN: 'GB29RBOS60161331926819' } as ConfigButton],
      },
    },
    {
      IBAN: 'FR1420041010050500013M02606',
      currency: 'EUR',
      amount: 2300,
      icon: {
        name: 'eur',
        value: 'fa_brands:figma',
      },
      configuration: {
        buttons: [
          {
            IBAN: 'FR1420041010050500013M02606',
          } as ConfigButton,
        ],
      },
    },
    {
      IBAN: 'US4412245221245930014556',
      currency: 'USD',
      amount: 3000,
      icon: {
        name: 'usd',
        value: 'fa_brands:weixin',
      },
      configuration: {
        buttons: [
          {
            IBAN: 'US4412245221245930014556',
            visible: true,
            name: 'Click ME',
            action: () => console.log('test'),
          },
        ],
      },
    },
  ];
}

export function getAccounts() {
  return [
    {
      IBAN: 'GB29RBOS60161331926819',
      currency: 'GBP',
      amount: 1500,
    },
    {
      IBAN: 'FR1420041010050500013M02606',
      currency: 'EUR',
      amount: 2300,
    },
    {
      IBAN: 'US4412245221245930014556',
      currency: 'USD',
      amount: 3000,
    },
  ];
}

export function getIcons() {
  return [
    {
      id: 1,
      name: 'gbp',
      value: 'fa_brands:waze',
    },
    {
      id: 2,
      name: 'usd',
      value: 'fa_brands:weixin',
    },
    {
      id: 3,
      name: 'eur',
      value: 'fa_brands:figma',
    },
  ];
}
