/**
 * Port for client-side OPRF server interaction.
 * The client sends a blinded point, the server evaluates blindly.
 */
export interface OprfGateway {
  /**
   * Request OPRF evaluation from the server.
   * Client sends blinded point B, server returns evaluated point E.
   */
  requestEvaluation(params: OprfEvaluationRequest): Promise<OprfEvaluationResponse>;

  /**
   * Notify the server that an unseal attempt failed (wrong password / GCM mismatch).
   */
  reportFailure(clientId: string, deviceId: string): Promise<void>;
}

export interface OprfEvaluationRequest {
  readonly clientId: string;
  readonly deviceId: string;
  readonly blindedPoint: Uint8Array;
}

export type OprfEvaluationResponse =
  | { readonly status: "allowed"; readonly evaluated: Uint8Array; readonly attemptsRemaining: number }
  | { readonly status: "wiped" };
