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
  title = 'Internet Computer Angular dapp';
  ic_response:string = '';

  constructor(private icService:IcService){
    this.getGreet('Roland');
  }
  
  public async getGreet(name:string){
    this.ic_response = await this.icService.greet(name);
  }
}
