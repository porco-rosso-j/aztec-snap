import { AccountWallet, CompleteAddress, createPXEClient, } from '@aztec/aztec.js';
import { SnapAccountInterface } from './snapWalletInterface.js';
import { requestSnap } from './snap-utils/request.js';
import { defaultSnapOrigin } from './constants.js';
import { createAccountSnap, getAddressSnap, getPendingShieldsSnap, redeemShieldSnap, } from './snapRpcMethods.js';
/**
 * Wallet implementation which creates a transaction request directly to the requested contract without any signing.
 */
export class SnapWallet extends AccountWallet {
    constructor(_pxe, _address, _snapRpc) {
        const account = new SnapAccountInterface(_pxe, _address, _snapRpc);
        super(_pxe, account);
    }
    async getPendingShields(from, token, amount) {
        return await getPendingShieldsSnap({
            from,
            token,
            amount,
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
}
export class AztecSnap {
    constructor(_PXE_URL, _snapRpc) {
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
    reconnect() { }
    disconnect() { }
    async getSelectedAddress() {
        return (await getAddressSnap(this.snapRpc))[0];
    }
    async getSnapWallet(address) {
        // if (!this.address) throw 'No connection with accounts';
        return new SnapWallet(this.pxe, address, this.snapRpc);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcFdhbGxldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zbmFwV2FsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxhQUFhLEVBQ2IsZUFBZSxFQUNmLGVBQWUsR0FDaEIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixjQUFjLEVBQ2QscUJBQXFCLEVBQ3JCLGdCQUFnQixHQUNqQixNQUFNLHFCQUFxQixDQUFDO0FBTTdCOztHQUVHO0FBQ0gsTUFBTSxPQUFPLFVBQVcsU0FBUSxhQUFhO0lBQzNDLFlBQVksSUFBUyxFQUFFLFFBQXlCLEVBQUUsUUFBaUI7UUFDakUsTUFBTSxPQUFPLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ25FLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVNLEtBQUssQ0FBQyxpQkFBaUIsQ0FDNUIsSUFBWSxFQUNaLEtBQWEsRUFDYixNQUFjO1FBRWQsT0FBTyxNQUFNLHFCQUFxQixDQUFDO1lBQ2pDLElBQUk7WUFDSixLQUFLO1lBQ0wsTUFBTTtTQUNjLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU0sS0FBSyxDQUFDLFlBQVksQ0FDdkIsSUFBWSxFQUNaLEtBQWEsRUFDYixNQUFjLEVBQ2QsV0FBbUI7UUFFbkIsT0FBTyxNQUFNLGdCQUFnQixDQUFDO1lBQzVCLElBQUk7WUFDSixLQUFLO1lBQ0wsTUFBTTtZQUNOLFdBQVc7WUFDWCxTQUFTLEVBQUUsS0FBSztTQUNLLENBQUMsQ0FBQztJQUMzQixDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sU0FBUztJQUlwQixZQUFZLFFBQWdCLEVBQUUsUUFBaUI7UUFDN0MsSUFBSSxDQUFDLEdBQUcsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUM7SUFDekQsQ0FBQztJQUNELEtBQUssQ0FBQyxPQUFPO1FBQ1gsTUFBTSxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUV6QyxJQUFJLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixPQUFPLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUMzQztRQUNELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELFNBQVMsS0FBSSxDQUFDO0lBRWQsVUFBVSxLQUFJLENBQUM7SUFFZixLQUFLLENBQUMsa0JBQWtCO1FBQ3RCLE9BQU8sQ0FBQyxNQUFNLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUF3QjtRQUMxQywwREFBMEQ7UUFDMUQsT0FBTyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekQsQ0FBQztDQUNGIn0=