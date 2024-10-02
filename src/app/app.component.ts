import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IcService } from './ic.service' ;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Internet Computer - Angular dApp template';
  ic_response:string = '';
  actor:any = undefined;

  constructor(private icService:IcService){
  }
  
  public async getLastName(){
    if(this.actor == undefined){
      this.actor = await this.icService.createActor({});
    }
    this.ic_response = await this.actor.getLastName();
    this.ic_response = `The last name stored is: "${this.ic_response}"`;
    console.log('response:', this.ic_response);
  }

  public async updateLastName(name:string){
    if(this.actor == undefined){
      this.actor = await this.icService.createActor({});
    }
    this.ic_response = await this.actor.updateLastName(name);
    console.log('response:', this.ic_response);
  }
}
