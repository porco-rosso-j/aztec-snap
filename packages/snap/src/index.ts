import {
  init,
  createPXEClient,
  PXE,
  Contract,
  GrumpkinScalar,
  getSandboxAccountsWallets,
  SchnorrAccountContract,
  AccountManager,
} from '@aztec/aztec.js';
// @ts-ignore
import { TokenContractArtifact } from '@aztec/noir-contracts/artifacts';
import type { OnRpcRequestHandler } from '@metamask/snaps-types';
import { PXE_URL } from './constants';
// import { panel, text } from '@metamask/snaps-ui';

export async function getAddress(): Promise<string> {
  await init();
  const pxe: PXE = createPXEClient(PXE_URL);
  console.log('pxe: ', pxe);
  console.log('node info: ', await pxe.getNodeInfo());
  const accountWallets = await getSandboxAccountsWallets(pxe);
  console.log('accountWallets: ', accountWallets);
  console.log('acc 0: ', accountWallets[0]?.getAddress().toString());
  const ownerWallet = accountWallets[0];

  const completeAddr = ownerWallet.getCompleteAddress();
  console.log('completeAddr: ', completeAddr.toString());
  console.log('TokenContractArtifact: ', TokenContractArtifact);

  const tx = Contract.deploy(ownerWallet, TokenContractArtifact, [
    completeAddr,
  ]);
  console.log('tx: ', tx);
  const token = tx.send();
  console.log('tx hash: ', (await token.getTxHash()).toString());
  console.log('token: ', token);
  const tokenContract = await token.deployed();

  console.log(`Token deployed at ${tokenContract.address.toString()}`);
  return 'sada';
}

export async function deployTokenFromSchnorrAccountContract(): Promise<string> {
  const encryptionPrivateKey: GrumpkinScalar = GrumpkinScalar.random();
  console.log('encryptionPrivateKey: ', encryptionPrivateKey);
  await init();
  const pxe: PXE = createPXEClient(PXE_URL);
  console.log('pxe: ', pxe);
  console.log('node info: ', await pxe.getNodeInfo());
  const accountContract = new SchnorrAccountContract(encryptionPrivateKey);
  console.log('accountContract: ', accountContract);
  const accountManager = new AccountManager(
    pxe,
    encryptionPrivateKey,
    accountContract,
  );
  console.log('4');
  console.log('accountManager: ', accountManager);

  const wallet = await accountManager.waitDeploy();
  console.log('5');
  console.log('wallet: ', wallet);
  const tokenContract = await Contract.deploy(wallet, TokenContractArtifact, [
    wallet.getCompleteAddress(),
  ])
    .send()
    .deployed();
  console.log('6');
  console.log(`Token deployed at ${tokenContract.address.toString()}`);
  return 'sada';
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
