import { AccountWallet, CompleteAddress, createPXEClient, } from '@aztec/aztec.js';
import { SnapAccountInterface } from './snapWalletInterface.js';
import { requestSnap } from './snap-utils/request.js';
import { defaultSnapOrigin } from './constants.js';
import { createAccountSnap, getAddressSnap } from './snapRpcMethods.js';
/**
 * Wallet implementation which creates a transaction request directly to the requested contract without any signing.
 */
export class SnapWallet extends AccountWallet {
    constructor(_pxe, _address, _snapRpc) {
        const account = new SnapAccountInterface(_pxe, _address, _snapRpc);
        super(_pxe, account);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcFdhbGxldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zbmFwV2FsbGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxhQUFhLEVBQ2IsZUFBZSxFQUNmLGVBQWUsR0FDaEIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hFOztHQUVHO0FBQ0gsTUFBTSxPQUFPLFVBQVcsU0FBUSxhQUFhO0lBQzNDLFlBQVksSUFBUyxFQUFFLFFBQXlCLEVBQUUsUUFBaUI7UUFDakUsTUFBTSxPQUFPLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ25FLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkIsQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLFNBQVM7SUFJcEIsWUFBWSxRQUFnQixFQUFFLFFBQWlCO1FBQzdDLElBQUksQ0FBQyxHQUFHLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO0lBQ3pELENBQUM7SUFDRCxLQUFLLENBQUMsT0FBTztRQUNYLE1BQU0sV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFekMsSUFBSSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osT0FBTyxHQUFHLE1BQU0saUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDM0M7UUFDRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxTQUFTLEtBQUksQ0FBQztJQUVkLFVBQVUsS0FBSSxDQUFDO0lBRWYsS0FBSyxDQUFDLGtCQUFrQjtRQUN0QixPQUFPLENBQUMsTUFBTSxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBd0I7UUFDMUMsMERBQTBEO1FBQzFELE9BQU8sSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pELENBQUM7Q0FDRiJ9