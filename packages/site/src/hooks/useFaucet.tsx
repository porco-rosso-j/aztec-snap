import { AztecAddress, createPXEClient } from '@aztec/aztec.js';
import { PXE_URL } from '../utils';
import { getInitialTestAccountsWallets } from '@aztec/accounts/testing';
import { TokenContract } from '@aztec/noir-contracts.js';
import { notifications } from '@mantine/notifications';

export default function useFaucet() {
  async function getFaucet(recipient: string): Promise<string> {
    notifications.show({
      title: 'Requesting Faucet',
      message: 'deploying & minting a new token...',
    });
    const pxe = createPXEClient(PXE_URL);
    const wallet = (await getInitialTestAccountsWallets(pxe))[0];

    try {
      const tokenContract = await TokenContract.deploy(
        wallet,
        wallet.getAddress(),
        'GAS Token',
        'GAS',
        18,
      )
        .send()
        .deployed();

      notifications.show({
        title: 'Deploying Token',
        message: 'gas token being deployed...',
      });
      console.log('tokenContract: ', tokenContract);
      console.log('tokenContract address: ', tokenContract.address.toString());

      const tx = await tokenContract.methods
        .mint_public(AztecAddress.fromString(recipient), 1000n)
        .send()
        .wait();

      console.log('ret: ', tx);
      notifications.show({
        title: 'Faucet Sent!',
        message: 'check your balance',
      });
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
    getFaucet,
  };
}
