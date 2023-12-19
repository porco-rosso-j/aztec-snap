import { useEffect, useState } from 'react';
import {
  init,
  AztecAddress,
  createPXEClient,
  getSandboxAccountsWallets,
} from '@aztec/aztec.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TokenContract } from '@aztec/noir-contracts/types';

export const PXE_URL = 'http://localhost:8080';
export const TOKEN_ADDRESS =
  '0x1acaf802b574911d610eb70d30eb70a22656146a17a4805d675909eee2a19344';

const getBalance = async (): Promise<number> => {
  const pxe = createPXEClient(PXE_URL);
  await init();
  const accountWallets = await getSandboxAccountsWallets(pxe);
  const aztecAddress = await accountWallets[0].getAddress();

  // https://github.com/porco-rosso-j/aztec_lend/blob/34e70cbc335222413c2edba1bae0a424a33288f1/src/scripts/cross-chain.ts#L436
  const l2tokenContract = await TokenContract.at(
    AztecAddress.fromString(TOKEN_ADDRESS),
    accountWallets[0],
  );

  console.log('l2tokenContract: ', l2tokenContract);

  const balance = await l2tokenContract.methods
    .balance_of_public(aztecAddress)
    .view({ from: aztecAddress });
  console.log('balance: ', balance);

  return Number(balance);
};

export const useBalance = (isSnapInstalled: boolean) => {
  const [balance, setBalance] = useState<number | undefined>();

  useEffect(() => {
    if (isSnapInstalled) {
      (async () => {
        const balanceResponse = await getBalance();
        if (balanceResponse !== undefined) {
          setBalance(balanceResponse);
        }
      })();
    }
  }, [isSnapInstalled]);

  return { balance };
};
