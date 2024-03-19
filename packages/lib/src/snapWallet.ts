import {
  PXE,
  AccountWallet,
  CompleteAddress,
  createPXEClient,
} from '@aztec/aztec.js';
import { SnapAccountInterface } from './snapWalletInterface.js';
import { requestSnap } from './snap-utils/request.js';
import { defaultSnapOrigin, snapVersion } from './constants.js';
import {
  addTokenSnap,
  createAccountSnap,
  createSecretSnap,
  getAddressSnap,
  getBalanceSnap,
  getPendingShieldsSnap,
  getTokensSnap,
  getTransactionsSnap,
  redeemShieldSnap,
} from './snapRpcMethods.js';
import {
  AddTokenParams,
  CreateSecretParams,
  GetBalanceParams,
  GetPendingShields,
  GetTokensParams,
  GetTransactionsParams,
  RedeemShieldParams,
  RedeemablePendingShield,
  Token,
  Transaction,
} from '@abstract-crypto/aztec-snap';
/**
 * Wallet implementation which creates a transaction request directly to the requested contract without any signing.
 */
export class SnapWallet extends AccountWallet {
  constructor(_pxe: PXE, _address: CompleteAddress, _snapRpc?: string) {
    const account = new SnapAccountInterface(_pxe, _address, _snapRpc);
    super(_pxe, account);
  }

  public async getBalance(
    from: string,
    address: string,
    token: string,
  ): Promise<number[]> {
    return await getBalanceSnap({
      from,
      address,
      token,
    } as GetBalanceParams);
  }

  public async createSecretHash(
    from: string,
    contract: string,
  ): Promise<string> {
    return await createSecretSnap({
      from,
      contract,
    } as CreateSecretParams);
  }

  public async getPendingShields(
    from: string,
    token: string,
  ): Promise<RedeemablePendingShield[] | undefined> {
    return await getPendingShieldsSnap({
      from,
      token,
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

  public async getTransactions(from: string): Promise<Transaction[]> {
    return await getTransactionsSnap({
      from,
    } as GetTransactionsParams);
  }

  public async getTokens(from: string): Promise<Token[]> {
    return await getTokensSnap({
      from,
    } as GetTokensParams);
  }

  public async addToken(from: string, token: Token) {
    await addTokenSnap({
      from,
      token,
    } as AddTokenParams);
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
    await requestSnap(this.snapRpc, snapVersion);

    let address = await this.getSelectedAddress();
    if (!address) {
      address = await createAccountSnap(this.snapRpc);
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
