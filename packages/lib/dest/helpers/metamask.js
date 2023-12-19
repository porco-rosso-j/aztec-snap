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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YW1hc2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9tZXRhbWFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLEtBQUssSUFBSSxFQUFFO0lBQ2hDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFFakMsSUFBSTtRQUNGLE1BQU0sYUFBYSxHQUFHLE1BQU0sUUFBUSxFQUFFLE9BQU8sQ0FBQztZQUM1QyxNQUFNLEVBQUUsb0JBQW9CO1NBQzdCLENBQUMsQ0FBQztRQUVILE1BQU0sZUFBZSxHQUFJLGFBQTBCLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXZFLE9BQU8sT0FBTyxDQUFDLFFBQVEsSUFBSSxlQUFlLENBQUMsQ0FBQztLQUM3QztJQUFDLE1BQU07UUFDTixPQUFPLEtBQUssQ0FBQztLQUNkO0FBQ0gsQ0FBQyxDQUFDIn0=