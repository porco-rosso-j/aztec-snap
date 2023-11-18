import { getSchnorrAccount } from '@aztec/aztec.js';
import { GrumpkinScalar } from '@aztec/foundation'
// import { GrumpkinPrivateKey } from '@aztec/types';
import type { OnRpcRequestHandler } from '@metamask/snaps-types';
import { panel, text } from '@metamask/snaps-ui';


const pk = '0x2153536ff6628eee01cf4024889ff977a18d9fa61d0e414422f7681cf085c281';
const encryptionPrivateKey = new GrumpkinScalar(new Fr(pk));

// console.log('as');

// getAddress();



export const getAddress = async (): Promise<string> => {
  const pxe = await createPXEClient('http://localhost:8080');

  // const encryptionPrivateKey = GrumpkinPrivateKey.random();
  // const signingPrivateKey = GrumpkinPrivateKey.random();
  // const wallet = getSchnorrAccount(pxe, encryptionPrivateKey, signingPrivateKey).waitDeploy();
  // console.log(`New account deployed at ${wallet.getAddress()}`);


  console.log('1');
  // const pxe = await createPXEClient('http://localhost:8080');
  // console.log('2');
  // const accountContract = new SingleKeyAccountContract(encryptionPrivateKey);
  // console.log('3');
  // const accountManager = new AccountManager(
  //   pxe,
  //   encryptionPrivateKey,
  //   accountContract,
  // );
  // console.log('4');

  // const wallet = await accountManager.getWallet();

  // console.log('5');
  // // const votingContract = await VotingContract.at(
  // //   '0x1254268ac4d842d5c3acd9e555015b13e2785a3e51b3272cd6578534e59d1c87',
  // //   wallet,
  // // );
  // // console.log('6');
  // // const adminAddr = await votingContract.methods.admin().view();
  // return wallet.getAddress();
};

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
export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {
  switch (request.method) {
    case 'hello':
      await getAddress();
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            text(`Hello, **${origin}**!`),
            text('This custom confirmation is just for display purposes.'),
            text(
              'But you can edit the snap source code to make it do something, if you want to!',
            ),
          ]),
        },
      });
    default:
      throw new Error('Method not found.');
  }
};
