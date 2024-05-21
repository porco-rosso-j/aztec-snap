export const PXE_URL = 'http://localhost:8080';
// export const PXE_URL = 'https://aztec-pxe.abstract-crypto.com';

export const getPXE = async () => {
  const aztec = await import('@aztec/aztec.js');
  return aztec.createPXEClient(PXE_URL);
};
