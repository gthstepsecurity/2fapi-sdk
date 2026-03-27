import type { VaultAttemptCounter } from "../../model/vault-attempt-counter.js";

/**
 * Server-side port: persists vault unseal attempt counters per device.
 */
export interface VaultAttemptStore {
  findByDevice(clientId: string, deviceId: string): Promise<VaultAttemptCounter | null>;
  save(counter: VaultAttemptCounter): Promise<void>;
  delete(clientId: string, deviceId: string): Promise<void>;
}
