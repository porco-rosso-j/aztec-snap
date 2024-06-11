import { PXE_URL } from '@abstract-crypto/aztec-snap-lib';
import { createPXEClient } from '@aztec/aztec.js';
import { Token } from '@uniswap/sdk-core';
import { ethers } from 'ethers';

export const L1_LOKAL_PRIVATE_kEY =
  'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

export const MNEMONIC =
  'test test test test test test test test test test test junk';

export const LOCAL_ETH_URL = 'http://localhost:8545';

export const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
export const DAI_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f';
export const WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
export const USDC_ADDRESS = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';

export const ethToken = new Token(1, ETH_ADDRESS, 18, 'ETH');
export const wethToken = new Token(1, WETH_ADDRESS, 18, 'WETH');
export const daioken = new Token(1, DAI_ADDRESS, 18, 'DAI');
export const usdcToken = new Token(1, USDC_ADDRESS, 6, 'USDC');

// https://etherscan.io/address/0x748de14197922c4ae258c7939c7739f3ff1db573
export const impersonatedL1Addr = '0x748dE14197922c4Ae258c7939C7739f3ff1db573';

export const ethWallet = new ethers.Wallet(
  L1_LOKAL_PRIVATE_kEY,
  new ethers.JsonRpcProvider(LOCAL_ETH_URL),
);

export const pxe = createPXEClient(PXE_URL);
