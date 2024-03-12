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
// export const createAccountSnap = async (): Promise<string | undefined> => {
//   try {
//     const address = snapRpcRequest({
//       snapRpcMethod: 'createAccount',
//     });
//     return address;
//   } catch (e) {
//     console.log('e: ', e);
//     return undefined;
//   }
// };
// export const createAccountSnap = async (): Promise<string | undefined> => {
//   try {
//     // const address = snapRpcRequest({
//     //   snapRpcMethod: 'createAccount',
//     // });
//     const result = await window.ethereum.request({
//       method: 'wallet_invokeSnap',
//       params: {
//         snapId: defaultSnapOrigin,
//         request: {
//           method: `azt_createAccount`,
//         },
//       },
//     });
//     return result as string;
//   } catch (e) {
//     console.log('e: ', e);
//     return undefined;
//   }
// };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9zbmFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBZ0VuRCxNQUFNLGNBQWMsR0FBRyxLQUFLLEVBQzFCLElBQTZCLEVBQzdCLEVBQUU7SUFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQzNDLE1BQU0sRUFBRSxtQkFBbUI7UUFDM0IsTUFBTSxFQUFFO1lBQ04sT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxTQUFTLElBQUksQ0FBQyxhQUF1QixFQUFFO2dCQUMvQyxNQUFNLEVBQUUsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUzthQUNuRDtZQUNELE1BQU0sRUFBRSxpQkFBaUI7U0FDMUI7S0FDRixDQUFDLENBQUM7SUFDSCxPQUFPLE1BQWdELENBQUM7QUFDMUQsQ0FBQyxDQUFDO0FBRUY7O0dBRUc7QUFFSCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFnQixFQUFFLEVBQUU7SUFDOUQsT0FBTyxjQUFjLENBQUM7UUFDcEIsYUFBYSxFQUFFLFFBQVE7UUFDdkIsTUFBTSxFQUFFO1lBQ04sU0FBUztTQUNWO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUY7O0dBRUc7QUFFSCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsS0FBSyxJQUFpQyxFQUFFO0lBQ3BFLElBQUk7UUFDRixNQUFNLE9BQU8sR0FBRyxjQUFjLENBQUM7WUFDN0IsYUFBYSxFQUFFLFlBQVk7U0FDNUIsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxPQUFPLENBQUM7S0FDaEI7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sU0FBUyxDQUFDO0tBQ2xCO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsOEVBQThFO0FBQzlFLFVBQVU7QUFDVix1Q0FBdUM7QUFDdkMsd0NBQXdDO0FBQ3hDLFVBQVU7QUFDVixzQkFBc0I7QUFDdEIsa0JBQWtCO0FBQ2xCLDZCQUE2QjtBQUM3Qix3QkFBd0I7QUFDeEIsTUFBTTtBQUNOLEtBQUs7QUFFTCw4RUFBOEU7QUFDOUUsVUFBVTtBQUNWLDBDQUEwQztBQUMxQywyQ0FBMkM7QUFDM0MsYUFBYTtBQUNiLHFEQUFxRDtBQUNyRCxxQ0FBcUM7QUFDckMsa0JBQWtCO0FBQ2xCLHFDQUFxQztBQUNyQyxxQkFBcUI7QUFDckIseUNBQXlDO0FBQ3pDLGFBQWE7QUFDYixXQUFXO0FBQ1gsVUFBVTtBQUNWLCtCQUErQjtBQUMvQixrQkFBa0I7QUFDbEIsNkJBQTZCO0FBQzdCLHdCQUF3QjtBQUN4QixNQUFNO0FBQ04sS0FBSztBQUVMLDJFQUEyRTtBQUMzRSxxREFBcUQ7QUFDckQsbUNBQW1DO0FBQ25DLGdCQUFnQjtBQUNoQixvQ0FBb0M7QUFDcEMsbUJBQW1CO0FBQ25CLG9DQUFvQztBQUNwQyxXQUFXO0FBQ1gsU0FBUztBQUNULG1CQUFtQjtBQUNuQixvQkFBb0I7QUFDcEIsS0FBSyJ9