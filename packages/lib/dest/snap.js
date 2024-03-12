import { defaultSnapOrigin } from './constants.js';
const snapRpcRequest = async (args) => {
    const result = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
            request: {
                method: `aztec_${args.snapRpcMethod}`,
                params: 'params' in args ? args.params : undefined,
            },
            snapId: defaultSnapOrigin,
        },
    });
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
 * Invoke the "azt_getAddress" RPC method from the snap.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zbmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRW5ELE1BQU0sY0FBYyxHQUFHLEtBQUssRUFDMUIsSUFBNkIsRUFDN0IsRUFBRTtJQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDM0MsTUFBTSxFQUFFLG1CQUFtQjtRQUMzQixNQUFNLEVBQUU7WUFDTixPQUFPLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLFNBQVMsSUFBSSxDQUFDLGFBQXVCLEVBQUU7Z0JBQy9DLE1BQU0sRUFBRSxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTO2FBQ25EO1lBQ0QsTUFBTSxFQUFFLGlCQUFpQjtTQUMxQjtLQUNGLENBQUMsQ0FBQztJQUNILE9BQU8sTUFBZ0QsQ0FBQztBQUMxRCxDQUFDLENBQUM7QUFFRjs7R0FFRztBQUVILE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQWdCLEVBQUUsRUFBRTtJQUM5RCxPQUFPLGNBQWMsQ0FBQztRQUNwQixhQUFhLEVBQUUsUUFBUTtRQUN2QixNQUFNLEVBQUU7WUFDTixTQUFTO1NBQ1Y7S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRjs7R0FFRztBQUVILE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxLQUFLLElBQWlDLEVBQUU7SUFDcEUsSUFBSTtRQUNGLE1BQU0sT0FBTyxHQUFHLGNBQWMsQ0FBQztZQUM3QixhQUFhLEVBQUUsWUFBWTtTQUM1QixDQUFDLENBQUM7UUFDSCxPQUFPLE9BQU8sQ0FBQztLQUNoQjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEIsT0FBTyxTQUFTLENBQUM7S0FDbEI7QUFDSCxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBRyxLQUFLLElBQWlDLEVBQUU7SUFDdkUsSUFBSTtRQUNGLE1BQU0sT0FBTyxHQUFHLGNBQWMsQ0FBQztZQUM3QixhQUFhLEVBQUUsZUFBZTtTQUMvQixDQUFDLENBQUM7UUFDSCxPQUFPLE9BQU8sQ0FBQztLQUNoQjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEIsT0FBTyxTQUFTLENBQUM7S0FDbEI7QUFDSCxDQUFDLENBQUMifQ==