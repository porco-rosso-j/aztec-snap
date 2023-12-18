import {
  init,
  AztecAddress,
  createPXEClient,
  Fr,
  FunctionCall,
  SignerlessWallet,
} from '@aztec/aztec.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TokenContract } from '@aztec/noir-contracts/types';
import { useState } from 'react';
import { makeTransaction, sendTxSnap } from '../utils';

export const PXE_URL = 'http://localhost:8080';
export const TOKEN_ADDRESS =
  '0x1ee8c016a2164cb3dff2f3bc893ce7321ab465bd0a3f30fc451bde42bc2afd62';
const sender =
  '0x06357cc85cb8fc561adbf741f63cd75efa26ffba1c80d431ec77d036d8edf022';

export const useSendAZT = () => {
  const [lastTxId, setLastTxId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const sendAZT = async (data: FormData) => {
    if (isLoading) {
      return;
    }

    try {
      setError(undefined);
      setLastTxId(undefined);
      setIsLoading(true);
      const toAddress = data.get('toAddress');
      const amount = data.get('amountInDoge');

      if (typeof toAddress === 'string' && typeof amount === 'string') {
        const pxe = createPXEClient(PXE_URL);
        await init();
        const token = await TokenContract.at(
          AztecAddress.fromString(TOKEN_ADDRESS),
          new SignerlessWallet(pxe),
        );
        const functionCall: FunctionCall = token.methods
          .transfer(
            AztecAddress.fromString(sender),
            AztecAddress.fromString(toAddress),
            Fr.fromString(amount),
            0,
          )
          .request();
        const response = await sendTxSnap({ funcCall: functionCall });
        console.log('response: ', response);
        setLastTxId(response.txId);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'string') {
        setError(err);
      } else {
        setError(`An unknown error occurred: ${JSON.stringify(err)}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { lastTxId, isLoading, error, sendAZT };
};
