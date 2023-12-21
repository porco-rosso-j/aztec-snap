/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useState } from 'react';
import {
  init,
  AztecAddress,
  createPXEClient,
  getSandboxAccountsWallets,
  SignerlessWallet,
} from '@aztec/aztec.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TokenContract } from '@aztec/noir-contracts/types';
import { PXE_URL, TOKEN_ADDRESS } from '../utils/constants';

export const useBalance = (
  isSnapInstalled: boolean,
  address: string | undefined,
) => {
  const [balance, setBalance] = useState<number | undefined>();

  useEffect(() => {
    if (isSnapInstalled && address) {
      (async () => {
        const balanceResponse = await getBalance(address);
        if (balanceResponse !== undefined) {
          setBalance(balanceResponse);
        }
      })();
    }
  }, [isSnapInstalled, address]);

  const getFacuet = async (address: string) => {
    const pxe = createPXEClient(PXE_URL);
    await init();
    const accountWallets = await getSandboxAccountsWallets(pxe);
    const aztecAddress = await accountWallets[0].getAddress();

    const l2tokenContract = await TokenContract.at(
      AztecAddress.fromString(TOKEN_ADDRESS),
      accountWallets[0],
    );

    try {
      const tx = await l2tokenContract.methods
        .mint_public(AztecAddress.fromString(address), 100)
        .send({ from: aztecAddress });

      await tx.wait();

      const balance: number = await getBalance(address);
      setBalance(balance);
    } catch (e) {
      console.log('e: ', e);
    }
  };

  return { balance, getFacuet };
};

export const getBalance = async (address: string): Promise<number> => {
  const pxe = createPXEClient(PXE_URL);
  await init();
  const wallet = new SignerlessWallet(pxe);

  // https://github.com/porco-rosso-j/aztec_lend/blob/34e70cbc335222413c2edba1bae0a424a33288f1/src/scripts/cross-chain.ts#L436
  const l2tokenContract = await TokenContract.at(
    AztecAddress.fromString(TOKEN_ADDRESS),
    wallet,
  );

  const aztecAddress = AztecAddress.fromString(address);
  const balance = await l2tokenContract.methods
    .balance_of_public(aztecAddress)
    .view({ from: aztecAddress });

  return Number(balance);
};
