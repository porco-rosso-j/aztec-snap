# Aztec Snap Library

Use `SnapWallet` that extends aztecjs's `SignerlessWallet` and build frontend app with Metamask Flask.

example:

```javascript
await init();

const wallet = new SnapWallet(pxe);
const token = await TokenContract.at(
  AztecAddress.fromString(TOKEN_ADDRESS),
  wallet,
);

const sentTx: SentTx = await token.methods
  .transfer_public(
    AztecAddress.fromString(SANDBOX_ADDRESS1),
    AztecAddress.fromString(toAddress),
    Number(amount),
    0,
  )
  .send();

await sentTx.wait();
```
