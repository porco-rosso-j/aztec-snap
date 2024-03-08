export function shortenAddress(address: string) {
  return (
    address.substring(0, 7) + '...' + address.substring(address.length - 6)
  );
}

export function shortenTxHash(address: string) {
  return (
    address.substring(0, 10) + '...' + address.substring(address.length - 10)
  );
}
