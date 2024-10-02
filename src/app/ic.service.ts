import { Injectable } from '@angular/core';
import { Actor, ActorSubclass, HttpAgent } from "@dfinity/agent";
import { environment } from '../environments/environment';

import type { _SERVICE } from "../declarations/backend/backend.did";

//@ts-ignore
import {idlFactory} from "../declarations/backend/backend.did.js";

@Injectable({
  providedIn: 'root'
})

// own service to get rid of the ready to use actor
export class IcService {
  private readonly CANISTER_ID_BACKEND = environment.BACKEND_CANISTER_ID;
  private readonly DFX_NETWORK = environment.DFX_NETWORK;
  private readonly DFX_HOST = environment.DFX_HOST;

  constructor() {}

  public async createActor(options:any): Promise<ActorSubclass<_SERVICE>> {

    if(this.CANISTER_ID_BACKEND == undefined){
      throw new Error()
    }
    options.agentOptions = {};
    options.agentOptions.host = this.DFX_HOST;

    const agent = HttpAgent.createSync({ ...options.agentOptions });

    // Fetch root key for certificate validation during development
    if (this.DFX_NETWORK !== "ic") {
      agent.fetchRootKey().catch((err:Error) => {
        console.warn(
          "Unable to fetch root key. Check to ensure that your local replica is running"
        );
        console.error(err);
      });
    }
    
    const actor = Actor.createActor<_SERVICE>(idlFactory, {
      agent,
      canisterId: this.CANISTER_ID_BACKEND
    });
    return actor;
  };
}