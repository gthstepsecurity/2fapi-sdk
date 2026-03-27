import type { VaultPepper } from "../../model/vault-pepper.js";

/**
 * Server-side port: stores vault peppers per (clientId, deviceId).
 * Implemented by a database adapter (PostgreSQL, Redis, etc.).
 */
export interface VaultPepperStore {
  save(pepper: VaultPepper): Promise<void>;
  findByDevice(clientId: string, deviceId: string): Promise<VaultPepper | null>;
  delete(clientId: string, deviceId: string): Promise<void>;
}
