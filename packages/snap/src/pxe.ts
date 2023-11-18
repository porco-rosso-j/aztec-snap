import { copyable, divider, heading, panel, text } from '@metamask/snaps-ui';
// import { TokenContract } from '@aztec/noir-contracts';
// import { getECDSAAccount } from './account';
// import { MakeTransactionParams } from './pxe-types';
import { MakeTransactionParams } from './types';
import { PXE_URL } from './constants';
import { VotingContract } from './contract-types/Voting';

// /**
//  * This demo wallet uses a single account/address.
//  */
// export const getAddress = async (): Promise<string> => {
//   const account = await getECDSAAccount();
//   return await account.getAddress();
// };

/**
 * This demo wallet uses a single account/address.
 */

const pk = '0x2153536ff6628eee01cf4024889ff977a18d9fa61d0e414422f7681cf085c281';

export const getAddress = async (): Promise<string> => {
  const aztec = await import('@aztec/aztec.js');
  // const encryptionPrivateKey = new aztec.GrumpkinScalar(new aztec.Fr(pk));
  // console.log('1');
  const pxe = await aztec.createPXEClient(PXE_URL);
  console.log('pxe: ', pxe);
  // const accountContract = new aztec.SingleKeyAccountContract(
  //   encryptionPrivateKey,
  // );
  // console.log('3');
  // const accountManager = new aztec.AccountManager(
  //   pxe,
  //   encryptionPrivateKey,
  //   accountContract,
  // );
  // console.log('4');

  // const wallet = await accountManager.getWallet();
  // console.log('5');
  // const votingContract = await VotingContract.at(
  //   '0x1254268ac4d842d5c3acd9e555015b13e2785a3e51b3272cd6578534e59d1c87',
  //   wallet,
  // );
  // console.log('6');
  // const adminAddr = await votingContract.methods.admin().view();
  // return adminAddr.toString();
  return '';
};

export const getTx = async (): Promise<any[]> => {
  // https://docs.aztec.network/apis/pxe/interfaces/pxe#viewtx
  // pxe.viewTx(functionName, args, to, from?)
  // need unconstrained balance fetch func?
  return [0];
};

export const getAztBalance = async (): Promise<number> => {
  // instantiate TokenContract
  // see private balance
  /*
    https://github.com/porco-rosso-j/aztec_lend/blob/34e70cbc335222413c2edba1bae0a424a33288f1/src/scripts/cross-chain.ts#L436
          const l2tokenContract = await TokenContract.at(
              l2TokenAddress,
              await userWallet()
              );
              return await l2tokenContract.methods
              .balance_of_public(userAztecAddr)
              .view({ from: userAztecAddr });
    */

  return 0;
};

export const makeTransaction = async ({
  toAddress,
  amountInSatoshi,
}: MakeTransactionParams): Promise<any> => {
  const amount = amountInSatoshi;
  const confirmationResponse = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        heading('Confirm transaction'),
        divider(),
        text('Send the following amount:'),
        copyable(amount.toString()),
        text('To the following address:'),
        copyable(toAddress),
      ]),
    },
  });

  if (confirmationResponse !== true) {
    throw new Error('Transaction must be approved by user');
  }

  // const account = await getECDSAAccount();
  // const userAddress = await account.getAddress();

  // FaucetableTokenCotnract: anyone can mint
  // const l2Token: TokenContract = await TokenContract.at(
  //   'l2TokenAddress',
  //   account,
  // );

  // const tx = l2Token.methods.mint_public(userAddress, amount).send();
  // const receipt = await tx.wait();
  // return receipt;
};
