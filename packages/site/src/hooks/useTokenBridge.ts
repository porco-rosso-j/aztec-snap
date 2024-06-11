import { PXE_URL, Token as SnapToken } from '@abstract-crypto/aztec-snap-lib';
import { getInitialTestAccountsWallets } from '@aztec/accounts/testing';
import { notifications } from '@mantine/notifications';
import { L1TransactSdk } from '@shieldswap/l1-transact';
import { CurrencyAmount, Token as UniSDKToken } from '@uniswap/sdk-core';
import { useAppContext } from '../contexts';
import {
  ethWallet,
  pxe,
  L1Token,
  WETH,
  getDAI,
  getUSDC,
  getWETH,
  ETH,
} from '../utils';
import { useGetL2Tokens } from './useGetL2Tokens';

export function useBridge() {
  const { metamaskWallet, snapWallet, bridgeSDK, saveBridgeSDK } =
    useAppContext();

  const { updateTokenBalances } = useGetL2Tokens();

  const setupBridgeSDK = async (): Promise<any> => {
    const sdk = await L1TransactSdk.deploy({
      pxeUrl: PXE_URL,
      l1Deployer: ethWallet,
      l2Deployer: (await getInitialTestAccountsWallets(pxe))[0],
    });

    saveBridgeSDK(sdk);
    return sdk;
  };

  async function getL1Tokens() {
    if (!snapWallet) {
      return;
    }

    try {
      notifications.show({
        title: 'Setting up Bridge',
        message: 'it may take more than 30 seconds...',
      });

      if (!bridgeSDK) {
        await setupBridgeSDK();
      }

      await getWETH(ethWallet.address, 10);
      await getDAI(ethWallet.address, 10000);
      await getUSDC(ethWallet.address, 10000);

      notifications.show({
        title: 'Setup Done!',
        message: 'check your public and private balance',
      });
    } catch (e) {
      console.log('e: ', e);
      notifications.show({
        title: 'Faucet Failed',
        message: 'something went wrong',
      });
      return '';
    }
  }

  async function bridgeAssetToL2(token: L1Token, amount: number) {
    let sdk: L1TransactSdk = bridgeSDK ? bridgeSDK : await setupBridgeSDK();

    if (!snapWallet || !metamaskWallet || !sdk) {
      return;
    }

    const uniSDKtoken = new UniSDKToken(
      31337,
      token.address,
      token.decimals,
      token.symbol,
    );
    const tokenContract = await sdk.l2RegisterTokenIfNotRegistered(uniSDKtoken);

    let _token = token;
    if (_token.symbol == 'WETH') {
      _token = ETH;
    }
    let snapToken: SnapToken = {
      address: tokenContract.address.toString(),
      name: _token.name,
      symbol: _token.symbol,
      decimals: _token.decimals,
    };

    const tokenAmount = token.decimals == 18 ? amount * 1e18 : amount * 1e6;

    await sdk.bridgeTokensFromL1ToL2({
      l1From: metamaskWallet,
      l2To: snapWallet,
      amounts: [
        CurrencyAmount.fromRawAmount(
          uniSDKtoken,
          tokenAmount, // raw units
        ),
      ],
    });

    await snapWallet.addToken(snapToken);
    await updateTokenBalances([tokenContract.address.toString()]);
  }

  async function bridgeAssetToL1(token: L1Token, amount: number) {
    console.log('snapWallet: ', snapWallet);
    console.log('metamaskWallet: ', metamaskWallet);
    console.log('bridgeSDK: ', bridgeSDK);

    let sdk: L1TransactSdk = bridgeSDK ? bridgeSDK : await setupBridgeSDK();

    console.log('bridgeSDK: ', sdk);
    if (!snapWallet || !metamaskWallet || !sdk) {
      return;
    }

    let _token = token;
    if (_token.symbol == 'ETH') {
      _token = WETH;
    }

    const uniSDKtoken = new UniSDKToken(
      31337,
      _token.address,
      _token.decimals,
      _token.symbol,
      _token.name,
      true,
    );

    const tokenAmount = token.decimals == 18 ? amount * 1e18 : amount * 1e6;

    await sdk.bridgeTokensFromL2ToL1({
      l2From: snapWallet,
      l1To: metamaskWallet,
      amounts: [
        CurrencyAmount.fromRawAmount(
          uniSDKtoken,
          tokenAmount, // raw units
        ),
      ],
    });

    await updateTokenBalances([]);
  }

  return {
    getL1Tokens,
    bridgeAssetToL2,
    bridgeAssetToL1,
  };
}
