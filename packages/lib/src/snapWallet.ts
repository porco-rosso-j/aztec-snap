import {
  PXE,
  AccountWallet,
  CompleteAddress,
  createPXEClient,
} from '@aztec/aztec.js';
import { SnapAccountInterface } from './snapWalletInterface.js';
import { requestSnap } from './snap-utils/request.js';
import { defaultSnapOrigin } from './constants.js';
import {
  createAccountSnap,
  getAddressSnap,
  getPendingShieldsSnap,
  redeemShieldSnap,
} from './snapRpcMethods.js';
import {
  GetPendingShields,
  RedeemShieldParams,
  RedeemablePendingShield,
} from '@abstract-crypto/aztec-snap';
/**
 * Wallet implementation which creates a transaction request directly to the requested contract without any signing.
 */
export class SnapWallet extends AccountWallet {
  constructor(_pxe: PXE, _address: CompleteAddress, _snapRpc?: string) {
    const account = new SnapAccountInterface(_pxe, _address, _snapRpc);
    super(_pxe, account);
  }

  public async getPendingShields(
    from: string,
    token: string,
    amount: number,
  ): Promise<RedeemablePendingShield[] | undefined> {
    return await getPendingShieldsSnap({
      from,
      token,
      amount,
    } as GetPendingShields);
  }

  public async redeemShield(
    from: string,
    token: string,
    amount: number,
    secretIndex: number,
  ): Promise<string> {
    return await redeemShieldSnap({
      from,
      token,
      amount,
      secretIndex,
      redeemAll: false,
    } as RedeemShieldParams);
  }
}

export class AztecSnap {
  private pxe: PXE;
  protected readonly snapRpc: string;

  constructor(_PXE_URL: string, _snapRpc?: string) {
    this.pxe = createPXEClient(_PXE_URL);
    this.snapRpc = _snapRpc ? _snapRpc : defaultSnapOrigin;
  }
  async connect() {
    await requestSnap(this.snapRpc, '0.1.0');

    let address = await this.getSelectedAddress();
    console.log('address: ', address);
    if (!address) {
      address = await createAccountSnap(this.snapRpc);
      console.log('created address: ', address);
    }
    return this.getSnapWallet(CompleteAddress.fromString(address));
  }

  reconnect() {}

  disconnect() {}

  async getSelectedAddress(): Promise<string> {
    return (await getAddressSnap(this.snapRpc))[0];
  }

  async getSnapWallet(address: CompleteAddress): Promise<SnapWallet> {
    // if (!this.address) throw 'No connection with accounts';
    return new SnapWallet(this.pxe, address, this.snapRpc);
  }
}
