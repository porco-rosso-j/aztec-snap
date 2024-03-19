export const computeSecret = async (
  contract: string,
  privateKey: Buffer,
  index: number,
) => {
  const aztec = await import('@aztec/aztec.js');
  const domainSeparatorBuffer = aztec.sha256(
    Buffer.from(new TextEncoder().encode('aztec_createSecretHash')),
  );

  return aztec.Fr.fromBuffer(
    aztec.sha256(
      Buffer.concat([
        domainSeparatorBuffer,
        privateKey,
        aztec.AztecAddress.fromString(contract).toBuffer(),
        new aztec.Fr(index).toBuffer(),
      ]),
    ),
  );
};
