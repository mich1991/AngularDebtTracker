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
  }
  onDeleteClick() : void {
    if (confirm('Are you sure you want to delete this user?')){
      this.clientService.deleteClient(this.id)
      this.router.navigate(['/'])
      this.flashMessage.show("User removed", {
        cssClass: 'alert-success' , timeout:3000})
    }
  }
}
