import {
  PXE,
  AccountWallet,
  CompleteAddress,
  createPXEClient,
  NodeInfo,
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
  updateBalancesSnap,
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
  UpdateBalancesParams,
} from '@abstract-crypto/aztec-snap';
/**
 * Wallet implementation which creates a transaction request directly to the requested contract without any signing.
 */
export class SnapWallet extends AccountWallet {
  constructor(
    _pxe: PXE,
    _address: CompleteAddress,
    _nodeInfo: NodeInfo,
    _snapRpc?: string,
  ) {
    const account = new SnapAccountInterface(
      _pxe,
      _address,
      _nodeInfo,
      _snapRpc,
    );
    super(_pxe, account);
  }

  public async getBalance(address: string, token: string): Promise<number[]> {
    return await getBalanceSnap({
      from: this.account.getCompleteAddress().toString(),
      address,
      token,
    } as GetBalanceParams);
  }

  public async updateBalances(
    address: string,
    tokens: string[],
    all: boolean,
  ): Promise<Token[]> {
    return await updateBalancesSnap({
      from: this.account.getCompleteAddress().toString(),
      address,
      tokens,
      all,
    } as UpdateBalancesParams);
  }

  public async createSecretHash(contract: string): Promise<string> {
    return await createSecretSnap({
      from: this.account.getCompleteAddress().toString(),
      contract,
    } as CreateSecretParams);
  }

  public async getPendingShields(
    token: string,
  ): Promise<RedeemablePendingShield[] | undefined> {
    return await getPendingShieldsSnap({
      from: this.account.getCompleteAddress().toString(),
      token,
    } as GetPendingShields);
  }

  public async redeemShield(
    token: string,
    amount: number,
    secretIndex: number,
  ): Promise<string> {
    return await redeemShieldSnap({
      from: this.account.getCompleteAddress().toString(),
      token,
      amount,
      secretIndex,
      redeemAll: false,
    } as RedeemShieldParams);
  }

  public async getTransactions(): Promise<Transaction[]> {
    return await getTransactionsSnap({
      from: this.account.getCompleteAddress().toString(),
    } as GetTransactionsParams);
  }

  public async getTokens(): Promise<Token[]> {
    return await getTokensSnap({
      from: this.account.getCompleteAddress().toString(),
    } as GetTokensParams);
  }

  public async addToken(token: Token) {
    await addTokenSnap({
      from: this.account.getCompleteAddress().toString(),
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
      // doesn't have to deploy a new acc here but just for ease atm
      address = await createAccountSnap(this.snapRpc);
    }
    return this.getSnapWallet(CompleteAddress.fromString(address));
  }

  disconnect() {}

  async getSelectedAddress(): Promise<string> {
    return (await getAddressSnap(this.snapRpc))[0];
  }

  async getSnapWallet(address: CompleteAddress): Promise<SnapWallet> {
    // if (!this.address) throw 'No connection with accounts';
    const nodeInfo = await this.pxe.getNodeInfo();
    return new SnapWallet(this.pxe, address, nodeInfo, this.snapRpc);
  }
}
