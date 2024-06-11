// import { CircleLetterT } from 'tabler-icons-react';
import { ethIcon, wethIcon, daiIcon, usdcIcon } from '../assets';
import {
  DAI_ADDRESS,
  ETH_ADDRESS,
  USDC_ADDRESS,
  WETH_ADDRESS,
} from './constants';
import { L1Token } from './types';

export const tokenIcons: { [key: string]: string } = {
  ETH: ethIcon,
  WETH: wethIcon,
  DAI: daiIcon,
  USDC: usdcIcon,
};

export const ETH = {
  address: ETH_ADDRESS,
  name: 'Ethereum',
  symbol: 'ETH',
  icon: ethIcon,
  decimals: 18,
};

export const WETH = {
  address: WETH_ADDRESS,
  name: 'Wrapped Ethereum',
  symbol: 'WETH',
  icon: wethIcon,
  decimals: 18,
};

const DAI = {
  address: DAI_ADDRESS,
  name: 'Dai Stablecoin',
  symbol: 'DAI',
  icon: daiIcon,
  decimals: 18,
};

const USDC = {
  address: USDC_ADDRESS,
  name: 'USD Coin',
  symbol: 'USDC',
  icon: usdcIcon,
  decimals: 6,
};

export const l1Tokens: L1Token[] = [WETH, USDC, DAI];
