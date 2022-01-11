import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import {Router, ActivatedRoute} from '@angular/router'
import { FlashMessagesService } from 'flash-messages-angular';


@Component({
  selector: 'app-single-client',
  templateUrl: './single-client.component.html',
  styleUrls: ['./single-client.component.scss']
})
export class SingleClientComponent implements OnInit {
  id!: string;
  client!: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private clientService : ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
    ) { }

  ngOnInit(): void {
    //  get id
    this.id = this.route.snapshot.params['id'];
    // get client
    this.clientService.getClient(this.id).subscribe((client: Client) =>{
      this.client = client
      if(this.client === undefined){
        this.flashMessage.show("User doesn't exist", {
          cssClass: 'alert-danger' , timeout:3000})
        this.router.navigate(['/'])
      }
      if (this.client.balance !== undefined && this.client!.balance > 0) {
        this.hasBalance = true
      } 
    })
  }
  updateBalance() : void{
    this.clientService.updateClient(this.client)
    this.flashMessage.show('Balance updated', {
      cssClass: 'alert-success', timeout:3000
    })
    this.router.navigate(['/'])
  }
}
