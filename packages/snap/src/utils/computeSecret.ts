export const computeSecret = async (
  contract: string,
  privateKey: Buffer,
  index: number,
) => {
  const { Fr, AztecAddress, sha256 } = await import('@aztec/aztec.js');
  const domainSeparatorBuffer = sha256(
    Buffer.from(new TextEncoder().encode('aztec_createSecretHash')),
  );

  const hashedSecretBuffer = sha256(
    Buffer.concat([
      domainSeparatorBuffer,
      privateKey,
      AztecAddress.fromString(contract).toBuffer(),
      new Fr(index).toBuffer(),
    ]),
  );

  return new Fr(bufferToBigInt(hashedSecretBuffer) % Fr.MODULUS);
};

function bufferToBigInt(buffer: Buffer): bigint {
  let result = BigInt(0);
  const byteLength = BigInt(256);

  for (const byte of buffer) {
    result = result * byteLength + BigInt(byte);
  }

  return result;
}
