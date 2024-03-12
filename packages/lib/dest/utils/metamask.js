/**
 * Detect if the wallet injecting the ethereum object is Flask.
 *
 * @returns True if the MetaMask version is Flask, false otherwise.
 */
export const isFlask = async () => {
    const provider = window.ethereum;
    try {
        const clientVersion = await provider?.request({
            method: 'web3_clientVersion',
        });
        const isFlaskDetected = clientVersion?.includes('flask');
        return Boolean(provider && isFlaskDetected);
    }
    catch {
        return false;
    }
};
/**
 * Check if the current provider supports snaps by calling `wallet_getSnaps`.
 *
 * @param provider - The provider to use to check for snaps support. Defaults to
 * `window.ethereum`.
 * @returns True if the provider supports snaps, false otherwise.
 */
export async function hasSnapsSupport(provider = window.ethereum) {
    try {
        await provider.request({
            method: 'wallet_getSnaps',
        });
        return true;
    }
    catch {
        return false;
    }
}
/**
 * Get a MetaMask provider using EIP6963. This will return the first provider
 * reporting as MetaMask. If no provider is found after 500ms, this will
 * return null instead.
 *
 * @returns A MetaMask provider if found, otherwise null.
 */
export async function getMetaMaskEIP6963Provider() {
    return new Promise((rawResolve) => {
        // Timeout looking for providers after 500ms
        const timeout = setTimeout(() => {
            resolve(null);
        }, 500);
        /**
         * Resolve the promise with a MetaMask provider and clean up.
         *
         * @param provider - A MetaMask provider if found, otherwise null.
         */
        function resolve(provider) {
            window.removeEventListener('eip6963:announceProvider', onAnnounceProvider);
            clearTimeout(timeout);
            rawResolve(provider);
        }
        /**
         * Listener for the EIP6963 announceProvider event.
         *
         * Resolves the promise if a MetaMask provider is found.
         *
         * @param event - The EIP6963 announceProvider event.
         * @param event.detail - The details of the EIP6963 announceProvider event.
         */
        function onAnnounceProvider({ detail }) {
            const { info, provider } = detail;
            if (info.rdns.includes('io.metamask')) {
                resolve(provider);
            }
        }
        window.addEventListener('eip6963:announceProvider', onAnnounceProvider);
        window.dispatchEvent(new Event('eip6963:requestProvider'));
    });
}
/**
 * Get a provider that supports snaps. This will loop through all the detected
 * providers and return the first one that supports snaps.
 *
 * @returns The provider, or `null` if no provider supports snaps.
 */
export async function getSnapsProvider() {
    if (typeof window === 'undefined') {
        return null;
    }
    if (await hasSnapsSupport()) {
        return window.ethereum;
    }
    if (window.ethereum?.detected) {
        for (const provider of window.ethereum.detected) {
            if (await hasSnapsSupport(provider)) {
                return provider;
            }
        }
    }
    if (window.ethereum?.providers) {
        for (const provider of window.ethereum.providers) {
            if (await hasSnapsSupport(provider)) {
                return provider;
            }
        }
    }
    const eip6963Provider = await getMetaMaskEIP6963Provider();
    if (eip6963Provider && (await hasSnapsSupport(eip6963Provider))) {
        return eip6963Provider;
    }
    return null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YW1hc2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvbWV0YW1hc2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0E7Ozs7R0FJRztBQUVILE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxLQUFLLElBQUksRUFBRTtJQUNoQyxNQUFNLFFBQVEsR0FBMkIsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUV6RCxJQUFJO1FBQ0YsTUFBTSxhQUFhLEdBQUcsTUFBTSxRQUFRLEVBQUUsT0FBTyxDQUFDO1lBQzVDLE1BQU0sRUFBRSxvQkFBb0I7U0FDN0IsQ0FBQyxDQUFDO1FBRUgsTUFBTSxlQUFlLEdBQUksYUFBMEIsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFdkUsT0FBTyxPQUFPLENBQUMsUUFBUSxJQUFJLGVBQWUsQ0FBQyxDQUFDO0tBQzdDO0lBQUMsTUFBTTtRQUNOLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7QUFDSCxDQUFDLENBQUM7QUFFRjs7Ozs7O0dBTUc7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLGVBQWUsQ0FDbkMsV0FBbUMsTUFBTSxDQUFDLFFBQVE7SUFFbEQsSUFBSTtRQUNGLE1BQU0sUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUNyQixNQUFNLEVBQUUsaUJBQWlCO1NBQzFCLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFBQyxNQUFNO1FBQ04sT0FBTyxLQUFLLENBQUM7S0FDZDtBQUNILENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLDBCQUEwQjtJQUM5QyxPQUFPLElBQUksT0FBTyxDQUFnQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1FBQy9ELDRDQUE0QztRQUM1QyxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQzlCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFUjs7OztXQUlHO1FBQ0gsU0FBUyxPQUFPLENBQUMsUUFBdUM7WUFDdEQsTUFBTSxDQUFDLG1CQUFtQixDQUN4QiwwQkFBMEIsRUFDMUIsa0JBQWtCLENBQ25CLENBQUM7WUFDRixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7UUFFRDs7Ozs7OztXQU9HO1FBQ0gsU0FBUyxrQkFBa0IsQ0FBQyxFQUFFLE1BQU0sRUFBZ0M7WUFDbEUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQUM7WUFFbEMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDckMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ25CO1FBQ0gsQ0FBQztRQUVELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQywwQkFBMEIsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBRXhFLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxnQkFBZ0I7SUFDcEMsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7UUFDakMsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELElBQUksTUFBTSxlQUFlLEVBQUUsRUFBRTtRQUMzQixPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUM7S0FDeEI7SUFFRCxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFO1FBQzdCLEtBQUssTUFBTSxRQUFRLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDL0MsSUFBSSxNQUFNLGVBQWUsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDbkMsT0FBTyxRQUFRLENBQUM7YUFDakI7U0FDRjtLQUNGO0lBRUQsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRTtRQUM5QixLQUFLLE1BQU0sUUFBUSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFO1lBQ2hELElBQUksTUFBTSxlQUFlLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ25DLE9BQU8sUUFBUSxDQUFDO2FBQ2pCO1NBQ0Y7S0FDRjtJQUVELE1BQU0sZUFBZSxHQUFHLE1BQU0sMEJBQTBCLEVBQUUsQ0FBQztJQUUzRCxJQUFJLGVBQWUsSUFBSSxDQUFDLE1BQU0sZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUU7UUFDL0QsT0FBTyxlQUFlLENBQUM7S0FDeEI7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMifQ==