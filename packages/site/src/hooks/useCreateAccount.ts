import { createAccountSnap } from '@abstract-crypto/aztec-snap-lib';
// import { useAppContext } from '../contexts';

export const useCreateAccount = () => {
  // const { snapWallet } = useAppContext();

  const createAccount = async () => {
    // if (!snapWallet) return;
    await createAccountSnap();
  };

  return { createAccount };
};
