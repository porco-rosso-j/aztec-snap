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
    const account = new SnapAccountInterface(_address, _nodeInfo, _snapRpc);
    super(_pxe, account);
  }

  public async getBalance(address: string, token: string): Promise<number[]> {
    return await getBalanceSnap({
      from: this.getSender(),
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
      from: this.getSender(),
      address,
      tokens,
      all,
    } as UpdateBalancesParams);
  }

  public async createSecretHash(contract: string): Promise<string> {
    return await createSecretSnap({
      from: this.getSender(),
      contract,
    } as CreateSecretParams);
  }

  public async getPendingShields(
    token: string,
  ): Promise<RedeemablePendingShield[] | undefined> {
    return await getPendingShieldsSnap({
      from: this.getSender(),
      token,
    } as GetPendingShields);
  }

  public async redeemShield(
    token: string,
    amount: number,
    secretIndex: number,
  ): Promise<string> {
    return await redeemShieldSnap({
      from: this.getSender(),
      token,
      amount,
      secretIndex,
      redeemAll: false,
    } as RedeemShieldParams);
  }

  public async getTransactions(): Promise<Transaction[]> {
    return await getTransactionsSnap({
      from: this.getSender(),
    } as GetTransactionsParams);
  }

  public async getTokens(): Promise<Token[]> {
    return await getTokensSnap({
      from: this.getSender(),
    } as GetTokensParams);
  }

  public async addToken(token: Token) {
    await addTokenSnap({
      from: this.getSender(),
      token,
    } as AddTokenParams);
  }

  getSender() {
    return this.account.getCompleteAddress().toString();
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
    // TODO: this should return multiple addresses
    // and the user chooses one they want it to be connected
    // and instantiate SnapWallet()
    return (await getAddressSnap(this.snapRpc))[0];
  }

  async getSnapWallet(address: CompleteAddress): Promise<SnapWallet> {
    // if (!this.address) throw 'No connection with accounts';
    const nodeInfo = await this.pxe.getNodeInfo();
    return new SnapWallet(this.pxe, address, nodeInfo, this.snapRpc);
  }
}
