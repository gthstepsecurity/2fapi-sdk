import type { OprfKey } from "../../model/oprf-key.js";

/**
 * Server-side port: stores OPRF keys per (clientId, deviceId).
 */
export interface OprfKeyStore {
  save(key: OprfKey): Promise<void>;
  findByDevice(clientId: string, deviceId: string): Promise<OprfKey | null>;
  delete(clientId: string, deviceId: string): Promise<void>;
}
