import {
  AccountWallet,
  AztecAddress,
  Fr,
  computeSecretHash,
  createPXEClient,
} from '@aztec/aztec.js';
import { Token, PXE_URL } from '@abstract-crypto/aztec-snap-lib';
import {
  getDeployedTestAccountsWallets,
  getInitialTestAccountsWallets,
} from '@aztec/accounts/testing';
// import { TokenContract } from '@aztec/noir-contracts.js';
import { TokenContract } from '@aztec/noir-contracts.js/Token';
import { notifications } from '@mantine/notifications';
import { useAppContext } from '../contexts/useAppContext';
import { addPendingShieldNoteToPXE } from '../utils';

export function useFaucet() {
  const { snapWallet } = useAppContext();

  async function getFaucet(
    recipient: string,
    token_num: number,
  ): Promise<string> {
    if (!snapWallet) return '';

    notifications.show({
      title: 'Requesting Faucet',
      message: 'it may take more than 30 seconds...',
    });
    const pxe = createPXEClient(PXE_URL);
    const wallet = (await getDeployedTestAccountsWallets(pxe))[0];

    let token: Token = {
      address: '',
      name: 'Token' + token_num.toString(),
      symbol: 'TKN' + token_num.toString(),
      decimal: 18,
    };

    let tokenContract;
    try {
      notifications.show({
        title: 'Deploying Token',
        message: 'token being deployed...',
      });

      tokenContract = await TokenContract.deploy(
        wallet,
        wallet.getAddress(),
        token.name,
        token.symbol,
        token.decimal,
      )
        .send()
        .deployed();

      console.log('tokenContract: ', tokenContract);

      token.address = tokenContract.address.toString();

      console.log('token useFaucet: ', token);

      notifications.show({
        title: 'Minting Token Publicly',
        message: 'token being minted...',
      });
      await tokenContract.methods
        .mint_public(AztecAddress.fromString(recipient), 1000n)
        .send()
        .wait();

      const secret = Fr.random();
      const secretHash = computeSecretHash(secret);

      notifications.show({
        title: 'Minting Token Privately',
        message: 'token being minted...',
      });
      const tx = await tokenContract.methods
        .mint_private(100n, secretHash)
        .send()
        .wait();

      await addPendingShieldNoteToPXE(
        wallet.getAddress(),
        AztecAddress.fromString(token.address),
        100n,
        secretHash,
        tx.txHash,
      );

      notifications.show({
        title: 'Redeeming Token',
        message: 'token being redeemed...',
      });

      await tokenContract.methods
        .redeem_shield(wallet.getAddress(), 100n, secret)
        .send()
        .wait();

      const sendTx = await tokenContract.methods
        .transfer(
          wallet.getAddress(),
          AztecAddress.fromString(recipient),
          100n,
          0,
        )
        .send()
        .wait();

      console.log('sendTx: ', sendTx);
      notifications.show({
        title: 'Faucet Sent!',
        message: 'check your public and private balance',
      });

      await snapWallet.addToken(snapWallet.getAddress().toString(), token);

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
