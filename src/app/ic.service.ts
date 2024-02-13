import { Injectable } from '@angular/core';
import { Actor, ActorSubclass, HttpAgent } from "@dfinity/agent";

import type { _SERVICE } from "../declarations/backend/backend.did";

//@ts-ignore
import {idlFactory} from "../declarations/backend/backend.did.js";

@Injectable({
  providedIn: 'root'
})
export class IcService {
  private readonly CANISTER_ID_BACKEND = process.env['CANISTER_ID_BACKEND'];
  private readonly DFX_NETWORK = process.env['DFX_NETWORK'];
  private Actor: any = undefined;

  constructor() {}

  private async createActor(): Promise<ActorSubclass<_SERVICE>> {

    if(this.CANISTER_ID_BACKEND == undefined){
      throw new Error()
    }

    const agent = new HttpAgent();
    
    // Fetch root key for certificate validation during development
    if (this.DFX_NETWORK !== "ic") {
      agent.fetchRootKey().catch((err) => {
        console.warn(
          "Unable to fetch root key. Check to ensure that your local replica is running"
        );
        console.error(err);
      });
    }
    
    const actor = await Actor.createActor<_SERVICE>(idlFactory, {
      agent,
      canisterId: this.CANISTER_ID_BACKEND
    });
    return actor;
  };

  public async greet(name:string){
    // Create an actor to interact with the IC if it doesn't exist
    if(this.Actor == undefined){
      console.log('Creating actor one time');
      this.Actor = await this.createActor();
    }
    
    console.log('canisterId:', this.CANISTER_ID_BACKEND);
    return await this.Actor.greet(name);
  }
}
