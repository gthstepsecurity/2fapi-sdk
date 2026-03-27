# Continuum Ghost — The Secret That Doesn't Exist

> Zero-Knowledge Proof authentication for APIs. The server never sees your secret.

Continuum Ghost is a protocol where the server **never sees, stores, or transmits** the client's secret. Authentication is based on [Pedersen commitments](https://en.wikipedia.org/wiki/Commitment_scheme) and [Schnorr/Sigma proofs](https://en.wikipedia.org/wiki/Proof_of_knowledge) over [Ristretto255](https://ristretto.group/).

A database breach reveals only commitments — mathematical values that are useless without the client's secret.

## Packages

| Package | Description | License |
|---------|-------------|---------|
| [`@2fapi/protocol-spec`](./packages/protocol-spec) | Protocol specification: constants, types, interfaces | Apache 2.0 |
| [`@2fapi/client-sdk`](./packages/client-sdk) | Client SDK: ZK proof generation for browsers and Node.js | Apache 2.0 |
| [`@2fapi/server`](https://github.com/gthstepsecurity/2fapi-server) | Verification server (separate repo) | [BSL 1.1](https://github.com/gthstepsecurity/2fapi-server/blob/main/LICENSE) |

## Quick Start

```bash
npm install @2fapi/client-sdk
```

```typescript
import { generateCommitment, generateProof } from "@2fapi/client-sdk";

// Registration (once) — generate commitment, send to server
const commitment = generateCommitment(secret, blindingFactor);

// Authentication (each time) — prove knowledge without revealing the secret
const proof = generateProof({ secret, blindingFactor, commitment, nonce });
```

## How It Works

1. **Registration**: Client generates secret + blinding factor, computes Pedersen commitment `C = s·G + r·H`, sends C to server
2. **Challenge**: Client requests a fresh nonce from the server
3. **Proof**: Client generates a Sigma proof bound to the nonce
4. **Verification**: Server verifies the proof against the stored commitment — without ever learning the secret

## Cryptographic Core

The [`crypto-core/`](./crypto-core) directory contains the Rust implementation of the cryptographic primitives:

- Ristretto255 group operations (via `curve25519-dalek`)
- Pedersen commitments
- Sigma/Schnorr proofs with Fiat-Shamir transform
- OPRF (Oblivious PRF, RFC 9497)
- Argon2id key derivation
- BIP-39 wordlist validation
- 2-of-2 additive secret sharing
- Constant-time operations throughout

Compiled to WASM for browser use and napi-rs for Node.js server use.

## Security

- 128-bit security under DLOG assumption on Ristretto255
- 28-pass internal red team audit, 109 findings, 0 open
- 1,940+ automated tests (TypeScript + Rust)
- Constant-time verification, timing-safe error responses
- OPRF-based credential derivation — offline brute-force impossible
- Perfect indistinguishability across all observable metrics

## License

Protocol specification and client SDK are licensed under **Apache 2.0**.

The verification server is licensed under **Business Source License 1.1** — free to self-host, converts to Apache 2.0 in 2030. See the [server repo](https://github.com/gthstepsecurity/2fapi-server) for details.

Copyright 2024-2026 Continuum Identity SAS.
