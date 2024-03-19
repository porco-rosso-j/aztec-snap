import {
  CurrencyEthereum,
  CoinBitcoin,
  CoinMonero,
  CircleLetterD,
  CircleLetterC,
  CircleLetterB,
  CircleLetterA,
  CircleLetterE,
  CircleLetterF,
  CircleLetterG,
  CircleLetterH,
  CircleLetterI,
  CircleLetterJ,
} from 'tabler-icons-react';

export const currencyIcons = [
  CircleLetterA,
  CircleLetterB,
  CircleLetterC,
  CircleLetterD,
  CircleLetterE,
  CircleLetterF,
  CircleLetterG,
  CircleLetterH,
  CircleLetterI,
  CircleLetterJ,
];

export type Token = {
  address: string;
  name: string;
  symbol: string;
  balance: number;
  price: number;
};

const ETH = {
  name: 'Ethereum',
  symbol: 'ETH',
  icon: CurrencyEthereum,
  balance: 10,
  price: 3000,
};

const BTC = {
  name: 'Bitcoin',
  symbol: 'BTC',
  icon: CoinBitcoin,
  balance: 1,
  price: 50000,
};

const XMR = {
  name: 'Monero',
  symbol: 'XMR',
  icon: CoinMonero,
  balance: 24,
  price: 100,
};

const DAI = {
  name: 'Dai Stablecoin',
  symbol: 'DAI',
  icon: CircleLetterD,
  balance: 1000,
  price: 1,
};

export const tokens = [ETH, BTC, XMR, DAI];
