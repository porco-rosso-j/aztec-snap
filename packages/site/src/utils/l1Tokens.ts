import { wethAbi } from './abi/wethAbi';
import {
  DAI_ADDRESS,
  ETH_ADDRESS,
  LOCAL_ETH_URL,
  MNEMONIC,
  USDC_ADDRESS,
  WETH_ADDRESS,
  impersonatedL1Addr,
} from './constants';
import { createPXEClient, CheatCodes, EthAddress } from '@aztec/aztec.js';
import { PXE_URL } from '@abstract-crypto/aztec-snap-lib';
import {
  WalletClient,
  createPublicClient,
  createWalletClient,
  http,
  parseEther,
  erc20Abi,
} from 'viem';
import { foundry } from 'viem/chains';
import { mnemonicToAccount } from 'viem/accounts';

const pxe = createPXEClient(PXE_URL);
const cc = CheatCodes.create(LOCAL_ETH_URL, pxe);
const hdAccount = mnemonicToAccount(MNEMONIC);

const walletClient: WalletClient = createWalletClient({
  account: hdAccount,
  transport: http(LOCAL_ETH_URL),
});

export const publicClient = createPublicClient({
  chain: foundry,
  transport: http(LOCAL_ETH_URL),
});

export const getL1Balance = async (
  token: string,
  address?: string,
): Promise<bigint> => {
  if (token == ETH_ADDRESS) {
    return await publicClient.getBalance({ address: address as `0x${string}` });
  } else {
    return await publicClient.readContract({
      address: token as `0x${string}`,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [address as `0x${string}`],
    });
  }
};

export const getTokens = async (to: string, amount: number) => {
  console.log('weth before: ', await getL1Balance(WETH_ADDRESS, to));
  console.log('dai before: ', await getL1Balance(DAI_ADDRESS, to));
  console.log('usdc before: ', await getL1Balance(USDC_ADDRESS, to));

  await getWETH(to, amount);
  await getDAI(to, amount);
  await getUSDC(to, amount);

  console.log('weth after: ', await getL1Balance(WETH_ADDRESS, to));
  console.log('dai after: ', await getL1Balance(DAI_ADDRESS, to));
  console.log('usdc after: ', await getL1Balance(USDC_ADDRESS, to));
};

export const getWETH = async (to: string, amount: number) => {
  const [account] = await walletClient.getAddresses();
  await walletClient.writeContract({
    account,
    address: WETH_ADDRESS,
    abi: wethAbi,
    chain: foundry,
    functionName: 'deposit',
    value: parseEther(amount.toString()),
  });

  console.log('deposited?');

  await walletClient.writeContract({
    account,
    address: WETH_ADDRESS,
    abi: erc20Abi,
    chain: foundry,
    functionName: 'transfer',
    args: [to as `0x${string}`, parseEther(amount.toString())],
  });
};

export const getDAI = async (to: string, amount: number) => {
  await cc.eth.startImpersonating(EthAddress.fromString(impersonatedL1Addr));

  await walletClient.writeContract({
    account: impersonatedL1Addr,
    address: DAI_ADDRESS,
    abi: erc20Abi,
    chain: foundry,
    functionName: 'transfer',
    args: [to as `0x${string}`, parseEther(amount.toString())],
  });

  await cc.eth.stopImpersonating(EthAddress.fromString(impersonatedL1Addr));
};

export const getUSDC = async (to: string, amount: number) => {
  await cc.eth.startImpersonating(EthAddress.fromString(impersonatedL1Addr));

  await walletClient.writeContract({
    account: impersonatedL1Addr,
    address: USDC_ADDRESS,
    abi: erc20Abi,
    chain: foundry,
    functionName: 'transfer',
    args: [to as `0x${string}`, BigInt((amount * 1e6).toString())],
  });

  await cc.eth.stopImpersonating(EthAddress.fromString(impersonatedL1Addr));
};
