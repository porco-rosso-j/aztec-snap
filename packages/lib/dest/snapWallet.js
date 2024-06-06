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
        const account = new SnapAccountInterface(_pxe, _address, _nodeInfo, _snapRpc);
        super(_pxe, account);
    }
    async getBalance(address, token) {
        return await getBalanceSnap({
            from: this.account.getCompleteAddress().toString(),
            address,
            token,
        });
    }
    async updateBalances(address, tokens, all) {
        return await updateBalancesSnap({
            from: this.account.getCompleteAddress().toString(),
            address,
            tokens,
            all,
        });
    }
    async createSecretHash(contract) {
        return await createSecretSnap({
            from: this.account.getCompleteAddress().toString(),
            contract,
        });
    }
    async getPendingShields(token) {
        return await getPendingShieldsSnap({
            from: this.account.getCompleteAddress().toString(),
            token,
        });
    }
    async redeemShield(token, amount, secretIndex) {
        return await redeemShieldSnap({
            from: this.account.getCompleteAddress().toString(),
            token,
            amount,
            secretIndex,
            redeemAll: false,
        });
    }
    async getTransactions() {
        return await getTransactionsSnap({
            from: this.account.getCompleteAddress().toString(),
        });
    }
    async getTokens() {
        return await getTokensSnap({
            from: this.account.getCompleteAddress().toString(),
        });
    }
    async addToken(token) {
        await addTokenSnap({
            from: this.account.getCompleteAddress().toString(),
            token,
        });
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
        return (await getAddressSnap(this.snapRpc))[0];
    }
    async getSnapWallet(address) {
        // if (!this.address) throw 'No connection with accounts';
        const nodeInfo = await this.pxe.getNodeInfo();
        return new SnapWallet(this.pxe, address, nodeInfo, this.snapRpc);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcFdhbGxldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zbmFwV2FsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxhQUFhLEVBQ2IsZUFBZSxFQUNmLGVBQWUsR0FFaEIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFDTCxZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixjQUFjLEVBQ2QsY0FBYyxFQUNkLHFCQUFxQixFQUNyQixhQUFhLEVBQ2IsbUJBQW1CLEVBQ25CLGdCQUFnQixFQUNoQixrQkFBa0IsR0FDbkIsTUFBTSxxQkFBcUIsQ0FBQztBQWM3Qjs7R0FFRztBQUNILE1BQU0sT0FBTyxVQUFXLFNBQVEsYUFBYTtJQUMzQyxZQUNFLElBQVMsRUFDVCxRQUF5QixFQUN6QixTQUFtQixFQUNuQixRQUFpQjtRQUVqQixNQUFNLE9BQU8sR0FBRyxJQUFJLG9CQUFvQixDQUN0QyxJQUFJLEVBQ0osUUFBUSxFQUNSLFNBQVMsRUFDVCxRQUFRLENBQ1QsQ0FBQztRQUNGLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVNLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBZSxFQUFFLEtBQWE7UUFDcEQsT0FBTyxNQUFNLGNBQWMsQ0FBQztZQUMxQixJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUNsRCxPQUFPO1lBQ1AsS0FBSztTQUNjLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRU0sS0FBSyxDQUFDLGNBQWMsQ0FDekIsT0FB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