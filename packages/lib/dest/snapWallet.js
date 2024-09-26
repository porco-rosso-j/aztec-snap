import { AccountWallet, CompleteAddress, createPXEClient, } from '@aztec/aztec.js';
import { SnapAccountInterface } from './snapWalletInterface.js';
import { requestSnap } from './snap-utils/request.js';
import { defaultSnapOrigin, snapVersion } from './constants.js';
import { addTokenSnap, createAccountSnap, createSecretSnap, getAddressSnap, getBalanceSnap, getPendingShieldsSnap, getTokensSnap, getTransactionsSnap, redeemShieldSnap, updateBalancesSnap, } from './snapRpcMethods.js';
/**
 * Wallet implementation which creates a transaction request directly to the requested contract without any signing.
 */
export class SnapWallet extends AccountWallet {
    constructor(_pxe, _address, _nodeInfo, _snapRpc) {
        const account = new SnapAccountInterface(_address, _nodeInfo, _snapRpc);
        super(_pxe, account);
    }
    async getBalance(address, token) {
        return await getBalanceSnap({
            from: this.getSender(),
            address,
            token,
        });
    }
    async updateBalances(address, tokens, all) {
        return await updateBalancesSnap({
            from: this.getSender(),
            address,
            tokens,
            all,
        });
    }
    async createSecretHash(contract) {
        return await createSecretSnap({
            from: this.getSender(),
            contract,
        });
    }
    async getPendingShields(token) {
        return await getPendingShieldsSnap({
            from: this.getSender(),
            token,
        });
    }
    async redeemShield(token, amount, secretIndex) {
        return await redeemShieldSnap({
            from: this.getSender(),
            token,
            amount,
            secretIndex,
            redeemAll: false,
        });
    }
    async getTransactions() {
        return await getTransactionsSnap({
            from: this.getSender(),
        });
    }
    async getTokens() {
        return await getTokensSnap({
            from: this.getSender(),
        });
    }
    async addToken(token) {
        await addTokenSnap({
            from: this.getSender(),
            token,
        });
    }
    getSender() {
        return this.account.getCompleteAddress().toString();
    }
}
export class AztecSnap {
    constructor(_PXE_URL, _snapRpc) {
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
    disconnect() { }
    async getSelectedAddress() {
        // TODO: this should return multiple addresses
        // and the user chooses one they want it to be connected
        // and instantiate SnapWallet()
        return (await getAddressSnap(this.snapRpc))[0];
    }
    async getSnapWallet(address) {
        // if (!this.address) throw 'No connection with accounts';
        const nodeInfo = await this.pxe.getNodeInfo();
        return new SnapWallet(this.pxe, address, nodeInfo, this.snapRpc);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcFdhbGxldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zbmFwV2FsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxhQUFhLEVBQ2IsZUFBZSxFQUNmLGVBQWUsR0FFaEIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFDTCxZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixjQUFjLEVBQ2QsY0FBYyxFQUNkLHFCQUFxQixFQUNyQixhQUFhLEVBQ2IsbUJBQW1CLEVBQ25CLGdCQUFnQixFQUNoQixrQkFBa0IsR0FDbkIsTUFBTSxxQkFBcUIsQ0FBQztBQWM3Qjs7R0FFRztBQUNILE1BQU0sT0FBTyxVQUFXLFNBQVEsYUFBYTtJQUMzQyxZQUNFLElBQVMsRUFDVCxRQUF5QixFQUN6QixTQUFtQixFQUNuQixRQUFpQjtRQUVqQixNQUFNLE9BQU8sR0FBRyxJQUFJLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDeEUsS0FBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFlLEVBQUUsS0FBYTtRQUNwRCxPQUFPLE1BQU0sY0FBYyxDQUFDO1lBQzFCLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3RCLE9BQU87WUFDUCxLQUFLO1NBQ2MsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFTSxLQUFLLENBQUMsY0FBYyxDQUN6QixPQUFlLEVBQ2YsTUFBZ0IsRUFDaEIsR0FBWTtRQUVaLE9BQU8sTUFB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