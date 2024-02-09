import { Actor, HttpAgent } from "@dfinity/agent";

// Imports and re-exports candid interface
import { idlFactory } from "./backend.did.js";
export { idlFactory } from "./backend.did.js";

// add the following lines to the ready to use actor
import { environment } from '../../environments/environment';
const canisterId = environment.BACKEND_CANISTER_ID;
const DFX_NETWORK = environment.DFX_NETWORK;
const DFX_HOST = environment.DFX_HOST;
//----------------------------------------------

export const createActor = (canisterId, options = {}) => {
  options.agentOptions = {};
  options.agentOptions.host = DFX_HOST;

  const agent = options.agent || new HttpAgent({ ...options.agentOptions });

  if (options.agent && options.agentOptions) {
    console.warn(
      "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }

  // Fetch root key for certificate validation during development
  if (DFX_NETWORK !== "ic") {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
      console.error(err);
    });
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions,
  });
};

export const backend = createActor(canisterId);
