import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import {Router, ActivatedRoute} from '@angular/router'
import { FlashMessagesService } from 'flash-messages-angular';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  id!:string;
  disableBalanceOnEdit: boolean = true
  client: Client = {
    id : '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  }

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
      })
  }

  onSubmit(form: NgForm){
    const {value, valid} = form
    console.log(value, valid)
    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly',{
        cssClass: 'alert-danger',
        timeout: 3000
      })
    }
    else {
      // add id to client
      value.id = this.id
      value.balance = this.disableBalanceOnEdit ? this.client.balance : value.balance
      // update client
      this.clientService.updateClient(value)
      // flash message
      this.flashMessage.show('Update success', {
        cssClass: 'alert-success',
        timeout: 3000
      })
      this.router.navigate(['/client', this.id])
    }
  }

}
