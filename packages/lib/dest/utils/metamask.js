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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YW1hc2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvbWV0YW1hc2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxLQUFLLElBQUksRUFBRTtJQUNoQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBRWpDLElBQUk7UUFDRixNQUFNLGFBQWEsR0FBRyxNQUFNLFFBQVEsRUFBRSxPQUFPLENBQUM7WUFDNUMsTUFBTSxFQUFFLG9CQUFvQjtTQUM3QixDQUFDLENBQUM7UUFFSCxNQUFNLGVBQWUsR0FBSSxhQUEwQixFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV2RSxPQUFPLE9BQU8sQ0FBQyxRQUFRLElBQUksZUFBZSxDQUFDLENBQUM7S0FDN0M7SUFBQyxNQUFNO1FBQ04sT0FBTyxLQUFLLENBQUM7S0FDZDtBQUNILENBQUMsQ0FBQyJ9