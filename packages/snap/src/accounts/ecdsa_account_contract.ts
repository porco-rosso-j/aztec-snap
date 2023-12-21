// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Ecdsa } from '@aztec/circuits.js/barretenberg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Fr } from '@aztec/foundation/fields';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ContractArtifact } from '@aztec/foundation/abi';
import { AuthWitnessProvider, BaseAccountContract } from '@aztec/aztec.js';
import { AuthWitness, CompleteAddress } from '@aztec/types';

import EcdsaAccountContractArtifact from '../contracts/artifacts/EcdsaAccount.json' assert { type: 'json' };

/**
 * Account contract that authenticates transactions using ECDSA signatures
 * verified against a secp256k1 public key stored in an immutable encrypted note.
 */
export class EcdsaAccountContract extends BaseAccountContract {
  constructor(private signingPrivateKey: Buffer) {
    super(EcdsaAccountContractArtifact as ContractArtifact);
  }

  getDeploymentArgs() {
    const signingPublicKey = new Ecdsa().computePublicKey(
      this.signingPrivateKey,
    );
    return [
      signingPublicKey.subarray(0, 32),
      signingPublicKey.subarray(32, 64),
    ];
  }

  getAuthWitnessProvider(_address: CompleteAddress): AuthWitnessProvider {
    return new EcdsaAuthWitnessProvider(this.signingPrivateKey);
  }
}

/** Creates auth witnesses using ECDSA signatures. */
class EcdsaAuthWitnessProvider implements AuthWitnessProvider {
  constructor(private signingPrivateKey: Buffer) {}

  createAuthWitness(message: Fr): Promise<AuthWitness> {
    const ecdsa = new Ecdsa();
    const signature = ecdsa.constructSignature(
      message.toBuffer(),
      this.signingPrivateKey,
    );
    return Promise.resolve(
      new AuthWitness(message, [...signature.r, ...signature.s]),
    );
  }
}
