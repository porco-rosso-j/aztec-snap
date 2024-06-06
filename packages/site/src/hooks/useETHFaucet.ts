import { createPXEClient } from '@aztec/aztec.js';
import { PXE_URL, Token } from '@abstract-crypto/aztec-snap-lib';
import { getInitialTestAccountsWallets } from '@aztec/accounts/testing';
import { notifications } from '@mantine/notifications';
import { useAppContext } from '../contexts/useAppContext';
import { L1TransactSdk } from '@shieldswap/l1-transact';
import { CurrencyAmount, Token as UniSDKToken } from '@uniswap/sdk-core';
import { l1Tokens, ethWallet, getWETH } from '../utils';

export function useETHFaucet() {
  const { snapWallet, saveBridgeSDK } = useAppContext();

  async function getETHFaucet(): Promise<string> {
    if (!snapWallet) return '';

    notifications.show({
      title: 'Requesting ETH Faucet',
      message: 'it may take more than 30 seconds...',
    });

    const pxe = createPXEClient(PXE_URL);
    const wallet = (await getInitialTestAccountsWallets(pxe))[0];

    try {
      const sdk = await L1TransactSdk.deploy({
        pxeUrl: PXE_URL,
        l1Deployer: ethWallet,
        l2Deployer: wallet,
      });
      saveBridgeSDK(sdk);

      await getWETH(ethWallet.address, 20);

      notifications.show({
        title: 'WETH acquired on L1',
        message: 'depositing ETH to get WETH token',
      });

      const weth: UniSDKToken = new UniSDKToken(
        31337,
        l1Tokens[0].address,
        l1Tokens[0].decimals,
        l1Tokens[0].symbol,
        l1Tokens[0].name,
        true,
      );

      console.log('weth: ', weth);

      const tokenContract = await sdk.l2RegisterTokenIfNotRegistered(weth);

      notifications.show({
        title: 'ETH being deployed',
        message: 'Wrapped WETH being deployed on Aztec',
      });

      await sdk.bridgeTokensFromL1ToL2({
        l1From: ethWallet,
        l2To: wallet,
        amounts: [
          CurrencyAmount.fromRawAmount(
            weth,
            20 * 1e18, // raw units
          ),
        ],
      });
      notifications.show({
        title: 'ETH Bridged',
        message: 'ETH claimed and redeemded on Aztec',
      });

      await tokenContract.methods
        .transfer(wallet.getAddress(), snapWallet.getAddress(), 10e18, 0)
        .send()
        .wait();

      notifications.show({
        title: 'Public ETH Faucet Sent',
        message: 'ETH sent to your address',
      });

      await tokenContract.methods
        .unshield(wallet.getAddress(), snapWallet.getAddress(), 10e18, 0)
        .send()
        .wait();

      notifications.show({
        title: 'Private ETH Faucet Sent',
        message: 'ETH sent to your address',
      });

      let l2eth: Token = {
        address: tokenContract.address.toString(),
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
      };

      await snapWallet.addToken(l2eth);
      return tokenContract.address.toString();
    } catch (e) {
      console.log('e: ', e);
      notifications.show({
        title: 'Faucet Failed',
        message: 'something went wrong',
      });
      return '';
    }
  }
  return {
    getETHFaucet,
  };
}
