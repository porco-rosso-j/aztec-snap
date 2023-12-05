import {
  createPXEClient,
  Fr,
  GrumpkinScalar,
  getSandboxAccountsWallets,
} from '@aztec/aztec.js';
import type { OnRpcRequestHandler } from '@metamask/snaps-types';
import { PXE_URL } from './constants';
// import { GrumpkinPrivateKey } from '@aztec/types';
// import { panel, text } from '@metamask/snaps-ui';

export async function getAddress(): Promise<string> {
  // const pk =
  //   0x2153536ff6628eee01cf4024889ff977a18d9fa61d0e414422f7681cf085c281n;
  // const encryptionPrivateKey = new GrumpkinScalar(new Fr(pk).fromS);
  // const encryptionPrivateKey: GrumpkinScalar = GrumpkinScalar.random();
  // console.log('encryptionPrivateKey: ', encryptionPrivateKey);
  const pxe = createPXEClient(PXE_URL);
  // const pxe = createPXEClient(PXE_URL, makeFetch([1, 2, 3, 4, 5], true));
  console.log('pxe: ', pxe);

  console.log('node info: ', await pxe.getNodeInfo());
  // console.log('waitForSandbox: ', waitForSandbox(pxe));
  const accountWallets = await getSandboxAccountsWallets(pxe);
  console.log('accountWallets: ', accountWallets);

  // console.log('node info: ', await pxe.getNodeInfo());
  // const accountContract = new SchnorrAccountContract(encryptionPrivateKey);
  // console.log('accountContract: ', accountContract);
  // const accountManager = new AccountManager(
  //   pxe,
  //   encryptionPrivateKey,
  //   accountContract,
  // );
  // console.log('4');
  // console.log('accountManager: ', accountManager);

  // // const wallet = await accountManager.getWallet();
  // const wallet = await accountManager.waitDeploy();
  // console.log('5');
  // console.log('wallet: ', wallet);
  // const votingContract = await VotingContract.at(
  //   '0x149a9593f1ca604b7aeb9c8d7732b872b84b358ac765e4a03af2093d2cb6da0e',
  //   wallet,
  // );
  console.log('6');
  // const adminAddr = await votingContract.methods.admin().view();
  // return adminAddr.toString();
  return accountWallets[0]?.getAddress().toString();
}
/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  // switch (request.method) {
  //   case 'hello':
  //     return snap.request({
  //       method: 'snap_dialog',
  //       params: {
  //         type: 'confirmation',
  //         content: panel([
  //           text(`Hello, **${origin}**!`),
  //           text('This custom confirmation is just for display purposes.'),
  //           text(
  //             'But you can edit the snap source code to make it do something, if you want to!',
  //           ),
  //         ]),
  //       },
  //     });
  //   default:
  //     throw new Error('Method not found.');
  // }
  switch (request.method) {
    case 'hello':
      return await getAddress();
    default:
      throw new Error('Method not found.');
  }
};
