import { createAccountSnap } from '@abstract-crypto/aztec-snap-lib';

export const useCreateAccount = () => {
  const createAccount = async () => {
    await createAccountSnap('1');
  };

  return { createAccount };
};
