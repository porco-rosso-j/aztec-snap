import { defaultSnapOrigin } from './constants.js';
/**
 * Get the installed snaps in MetaMask.
 *
 * @returns The snaps installed in MetaMask.
 */
export const getSnaps = async () => {
    return (await window.ethereum.request({
        method: 'wallet_getSnaps',
    }));
};
/**
 * Connect a snap to MetaMask.
 *
 * @param snapId - The ID of the snap.
 * @param params - The params to pass with the snap to connect.
 */
export const connectSnap = async (snapId = defaultSnapOrigin, params = {}) => {
    await window.ethereum.request({
        method: 'wallet_requestSnaps',
        params: {
            [snapId]: params,
        },
    });
};
export const getSnap = async (version) => {
    try {
        const snaps = await getSnaps();
        return Object.values(snaps).find((snap) => snap.id === defaultSnapOrigin && (!version || snap.version === version));
    }
    catch (e) {
        console.log('Failed to obtain installed snap', e);
        return undefined;
    }
};
export const isLocalSnap = (snapId) => snapId.startsWith('local:');
const snapRpcRequest = async (args) => {
    const result = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
            snapId: defaultSnapOrigin,
            request: {
                method: `azt_${args.snapRpcMethod}`,
                params: 'params' in args ? args.params : undefined,
            },
        },
    });
    console.log('result', result);
    return result;
};
/**
 * Invoke the "azte_sendTx" RPC method from the snap.
 */
export const sendTxSnap = async ({ txRequest }) => {
    return snapRpcRequest({
        snapRpcMethod: 'sendTx',
        params: {
            txRequest,
        },
    });
};
/**
 * Invoke the "doge_getAddress" RPC method from the snap.
 */
export const getAddressSnap = async () => {
    try {
        const address = snapRpcRequest({
            snapRpcMethod: 'getAddress',
        });
        return address;
    }
    catch (e) {
        console.log('e: ', e);
        return undefined;
    }
};
export const createAccountSnap = async () => {
    try {
        const address = snapRpcRequest({
            snapRpcMethod: 'createAccount',
        });
        return address;
    }
    catch (e) {
        console.log('e: ', e);
        return undefined;
    }
};
// export const getAddressSnap = async (): Promise<string | undefined> => {
//   const address = (await window.ethereum.request({
//     method: 'wallet_invokeSnap',
//     params: {
//       snapId : defaultSnapOrigin,
//       request: {
//         method: 'azt_getAddress',
//       },
//     },
//   })) as string;
//   return address;
// };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9zbmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRW5EOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUcsS0FBSyxJQUErQixFQUFFO0lBQzVELE9BQU8sQ0FBQyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQ3BDLE1BQU0sRUFBRSxpQkFBaUI7S0FDMUIsQ0FBQyxDQUFnQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQztBQUVGOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLEtBQUssRUFDOUIsU0FBaUIsaUJBQWlCLEVBQ2xDLFNBQThDLEVBQUUsRUFDaEQsRUFBRTtJQUNGLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDNUIsTUFBTSxFQUFFLHFCQUFxQjtRQUM3QixNQUFNLEVBQUU7WUFDTixDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU07U0FDakI7S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUFFLE9BQWdCLEVBQTZCLEVBQUU7SUFDM0UsSUFBSTtRQUNGLE1BQU0sS0FBSyxHQUFHLE1BQU0sUUFBUSxFQUFFLENBQUM7UUFFL0IsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FDOUIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUNQLElBQUksQ0FBQyxFQUFFLEtBQUssaUJBQWlCLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxDQUMxRSxDQUFDO0tBQ0g7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEQsT0FBTyxTQUFTLENBQUM7S0FDbEI7QUFDSCxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxNQUFjLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7QUFPM0UsTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUMxQixJQUE2QixFQUM3QixFQUFFO0lBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUMzQyxNQUFNLEVBQUUsbUJBQW1CO1FBQzNCLE1BQU0sRUFBRTtZQUNOLE1BQU0sRUFBRSxpQkFBaUI7WUFDekIsT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxPQUFPLElBQUksQ0FBQyxhQUF1QixFQUFFO2dCQUM3QyxNQUFNLEVBQUUsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUzthQUNuRDtTQUNGO0tBQ0YsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUIsT0FBTyxNQUFnRCxDQUFDO0FBQzFELENBQUMsQ0FBQztBQUVGOztHQUVHO0FBRUgsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBZ0IsRUFBRSxFQUFFO0lBQzlELE9BQU8sY0FBYyxDQUFDO1FBQ3BCLGFBQWEsRUFBRSxRQUFRO1FBQ3ZCLE1BQU0sRUFBRTtZQUNOLFNBQVM7U0FDVjtLQUNGLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBRUgsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLEtBQUssSUFBaUMsRUFBRTtJQUNwRSxJQUFJO1FBQ0YsTUFBTSxPQUFPLEdBQUcsY0FBYyxDQUFDO1lBQzdCLGFBQWEsRUFBRSxZQUFZO1NBQzVCLENBQUMsQ0FBQztRQUNILE9BQU8sT0FBTyxDQUFDO0tBQ2hCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0QixPQUFPLFNBQVMsQ0FBQztLQUNsQjtBQUNILENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLEtBQUssSUFBaUMsRUFBRTtJQUN2RSxJQUFJO1FBQ0YsTUFBTSxPQUFPLEdBQUcsY0FBYyxDQUFDO1lBQzdCLGFBQWEsRUFBRSxlQUFlO1NBQy9CLENBQUMsQ0FBQztRQUNILE9BQU8sT0FBTyxDQUFDO0tBQ2hCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0QixPQUFPLFNBQVMsQ0FBQztLQUNsQjtBQUNILENBQUMsQ0FBQztBQUVGLDJFQUEyRTtBQUMzRSxxREFBcUQ7QUFDckQsbUNBQW1DO0FBQ25DLGdCQUFnQjtBQUNoQixvQ0FBb0M7QUFDcEMsbUJBQW1CO0FBQ25CLG9DQUFvQztBQUNwQyxXQUFXO0FBQ1gsU0FBUztBQUNULG1CQUFtQjtBQUNuQixvQkFBb0I7QUFDcEIsS0FBSyJ9