# Metamask Snap on Aztec Sandbox

Aztec Snap is the first MetaMask Snap on Aztec that enables private function calls to any Aztec contract.

AztecSnap deterministically derives private keys from the existing seed phrase managed by Metamask via Snap's api call `snap_getBip44Entropy` to offer great security and UX for ethereum users.

More specifically, it currently uses the derived private key as a signing key for [`ECDSAAccountContract`](https://github.com/AztecProtocol/aztec-packages/blob/aztec-packages-v0.24.0/yarn-project/accounts/src/ecdsa/account_contract.ts), while the encryption key is the one reduced from the same private key to a new valid grumpkin scalar value.

## Develop with AztecSnap

### clone this project

```shell
git clone git@github.com:porco-rosso-j/aztec-snap.git
```

### install packages and start

install dependencies:

```shell
yarn
```

start snap server:

```shell
cd packages/snap
yarn start
```

start frontend:

```shell
cd packages/site
yarn dev
```

### Packages

#### snap-dapp (./packages/site)

The current implementation is an app for managing AztecSnap Wallet. But you can build any frontend dapp modifying this directory.

#### aztec-snap (./packages/snap)

This directory contains snap's backend source code.

#### aztec-snap-lib (,/packages/lib)

aztec-snap-lib is a library that exports `SnapWallet` instance.

SnapWallet can be thought of as ethers's Signer intance that can be instantiated and used like following.

example:

```javascript
import { SnapWallet } from '@abstract-crypto/aztec-snap-lib';

const wallet = new SnapWallet(pxe);
const token = await TokenContract.at(
  AztecAddress.fromString(TOKEN_ADDRESS),
  wallet,
);

const sentTx: SentTx = await token.methods
  .transfer_public(
    AztecAddress.fromString(fromAddress),
    AztecAddress.fromString(toAddress),
    Number(amount),
    0,
  )
  .send();

await sentTx.wait();
```

In the future, snap (./pakcages/snap) will be hosted externally and lib (./packages/lib) will be provided as a npm package.

### Reference

- [Aztec Developer Documentation](https://docs.aztec.network/)
- [Metamask Snap Doc](https://docs.metamask.io/snaps/)

```

```
