import {
  PXE,
  AccountWallet,
  CompleteAddress,
  createPXEClient,
} from '@aztec/aztec.js';
import { SnapAccountInterface } from './snapWalletInterface.js';
import { requestSnap } from './snap-utils/request.js';
import { defaultSnapOrigin } from './constants.js';
import { createAccountSnap, getAddressSnap } from './snapRpcMethods.js';
/**
 * Wallet implementation which creates a transaction request directly to the requested contract without any signing.
 */
export class SnapWallet extends AccountWallet {
  constructor(_pxe: PXE, _address: CompleteAddress, _snapRpc?: string) {
    const account = new SnapAccountInterface(_pxe, _address, _snapRpc);
    super(_pxe, account);
  }
}

export class AztecSnap {
  private address: CompleteAddress | null;
  private pxe: PXE;
  protected readonly snapRpc: string;

  constructor(_PXE_URL: string, _snapRpc?: string) {
    this.address = null;
    this.pxe = createPXEClient(_PXE_URL);
    this.snapRpc = _snapRpc ? _snapRpc : defaultSnapOrigin;
  }
  async connect() {
    // some asserts here
    // e.g. flask is not installed

    await requestSnap(this.snapRpc, '0.1.0');
    let address;
    if (!this.address) {
      address = await getAddressSnap(this.snapRpc);
      if (!address) {
        address = await createAccountSnap(this.snapRpc);
      }
      this.address = CompleteAddress.fromString(address);
    }

    // await selectAccount() -> trigger pop-up

    return this.getSnapWallet();
  }

  reconnect() {}

  disconnect() {}

  create() {}

  getSnapWallet(): SnapWallet {
    if (!this.address) throw 'No connection with accounts';
    return new SnapWallet(this.pxe, this.address, this.snapRpc);
  }
}
