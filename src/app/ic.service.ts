import { Injectable } from '@angular/core';
import { createActor } from '../declarations/backend';
import type { _SERVICE } from "../declarations/backend/backend.did";
import { ActorSubclass } from "@dfinity/agent";

@Injectable({
  providedIn: 'root'
})
export class IcService {
  private readonly CANISTER_ID_BACKEND = process.env['CANISTER_ID_BACKEND'];
  private readonly Actor: ActorSubclass<_SERVICE>;

  constructor() {
    if(this.CANISTER_ID_BACKEND == undefined){
      throw new Error()
    }

    // Create an actor to interact with the IC for a particular canister ID
    this.Actor = createActor(this.CANISTER_ID_BACKEND, { agentOptions: {} });
    console.log('canisterId:', this.CANISTER_ID_BACKEND);
  }

  public async greet(name:string){
    return await this.Actor.greet(name);
  }
}
