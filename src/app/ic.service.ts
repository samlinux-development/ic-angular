import { Injectable } from '@angular/core';
import { createActor } from '../declarations/backend';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IcService {
  constructor() { }
  public async greet(name:string){
    // Create an actor to interact with the IC for a particular canister ID
    const canisterId = environment.BACKEND_CANISTER_ID;
    const actor = createActor(canisterId, { agentOptions: { } });
    
    console.log('check environment', environment);

    return await actor.greet(name);
    
  }
}
