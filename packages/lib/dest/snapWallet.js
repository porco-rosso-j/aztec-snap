import { AccountWallet, CompleteAddress, createPXEClient, } from '@aztec/aztec.js';
import { SnapAccountInterface } from './snapWalletInterface.js';
import { requestSnap } from './snap-utils/request.js';
import { defaultSnapOrigin, snapVersion } from './constants.js';
import { addTokenSnap, createAccountSnap, createSecretSnap, getAddressSnap, getBalanceSnap, getPendingShieldsSnap, getTokensSnap, getTransactionsSnap, redeemShieldSnap, } from './snapRpcMethods.js';
/**
 * Wallet implementation which creates a transaction request directly to the requested contract without any signing.
 */
export class SnapWallet extends AccountWallet {
    constructor(_pxe, _address, _snapRpc) {
        const account = new SnapAccountInterface(_pxe, _address, _snapRpc);
        super(_pxe, account);
    }
    async getBalance(from, address, token) {
        return await getBalanceSnap({
            from,
            address,
            token,
        });
    }
    async createSecretHash(from, contract) {
        return await createSecretSnap({
            from,
            contract,
        });
    }
    async getPendingShields(from, token) {
        return await getPendingShieldsSnap({
            from,
            token,
        });
    }
    async redeemShield(from, token, amount, secretIndex) {
        return await redeemShieldSnap({
            from,
            token,
            amount,
            secretIndex,
            redeemAll: false,
        });
    }
    async getTransactions(from) {
        return await getTransactionsSnap({
            from,
        });
    }
    async getTokens(from) {
        return await getTokensSnap({
            from,
        });
    }
    async addToken(from, token) {
        await addTokenSnap({
            from,
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
        return new SnapWallet(this.pxe, address, this.snapRpc);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcFdhbGxldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zbmFwV2FsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxhQUFhLEVBQ2IsZUFBZSxFQUNmLGVBQWUsR0FDaEIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hFLE9BQU8sRUFDTCxZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixjQUFjLEVBQ2QsY0FBYyxFQUNkLHFCQUFxQixFQUNyQixhQUFhLEVBQ2IsbUJBQW1CLEVBQ25CLGdCQUFnQixHQUNqQixNQUFNLHFCQUFxQixDQUFDO0FBYTdCOztHQUVHO0FBQ0gsTUFBTSxPQUFPLFVBQVcsU0FBUSxhQUFhO0lBQzNDLFlBQVksSUFBUyxFQUFFLFFBQXlCLEVBQUUsUUFBaUI7UUFDakUsTUFBTSxPQUFPLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ25FLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVNLEtBQUssQ0FBQyxVQUFVLENBQ3JCLElBQVksRUFDWixPQUFlLEVBQ2YsS0FBYTtRQUViLE9BQU8sTUFBTSxjQUFjLENBQUM7WUFDMUIsSUFBSTtZQUNKLE9BQU87WUFDUCxLQUFLO1NBQ2MsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFTSxLQUFLLENBQUMsZ0JBQWdCLENBQzNCLElBQVksRUFDWixRQUFnQjtRQUVoQixPQUFPLE1BQU0sZ0JBQWdCLENBQUM7WUFDNUIsSUFBSTtZQUNKLFFBQVE7U0FDYSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVNLEtBQUssQ0FBQyxpQkFBaUIsQ0FDNUIsSUFBWSxFQUNaLEtBQWE7UUFFYixPQUFPLE1BQU0scUJBQXFCLENBQUM7WUFDakMsSUFBSTtZQUNKLEtBQUs7U0FDZSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVNLEtBQUssQ0FBQyxZQUFZLENBQ3ZCLElBQVksRUFDWixLQUFhLEVBQ2IsTUFBYyxFQUNkLFdBQW1CO1FBRW5CLE9BQU8sTUFBTSxnQkFBZ0IsQ0FBQztZQUM1QixJQUFJO1lBQ0osS0FBSztZQUNMLE1BQU07WUFDTixXQUFXO1lBQ1gsU0FBUyxFQUFFLEtBQUs7U0FDSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVNLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBWTtRQUN2QyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7WUFDL0IsSUFBSTtTQUNvQixDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVNLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBWTtRQUNqQyxPQUFPLE1BQU0sYUFBYSxDQUFDO1lBQ3pCLElBQUk7U0FDYyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVNLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBWSxFQUFFLEtBQVk7UUFDOUMsTUFBTSxZQUFZLENBQUM7WUFDakIsSUFBSTtZQUNKLEtBQUs7U0FDWSxDQUFDLENBQUM7SUFDdkIsQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLFNBQVM7SUFJcEIsWUFBWSxRQUFnQixFQUFFLFFBQWlCO1FBQzdDLElBQUksQ0FBQyxHQUFHLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO0lBQ3pELENBQUM7SUFDRCxLQUFLLENBQUMsT0FBTztRQUNYLE1BQU0sV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFN0MsSUFBSSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osOERBQThEO1lBQzlELE9BQU8sR0FBRyxNQUFNLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNqRDtRQUNELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELFVBQVUsS0FBSSxDQUFDO0lBRWYsS0FBSyxDQUFDLGtCQUFrQjtRQUN0QixPQUFPLENBQUMsTUFBTSxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBd0I7UUFDMUMsMERBQTBEO1FBQzFELE9BQU8sSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pELENBQUM7Q0FDRiJ9