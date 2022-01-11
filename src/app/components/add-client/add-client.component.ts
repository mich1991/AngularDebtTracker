import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { NgForm } from '@angular/forms';


import { FlashMessagesService } from 'flash-messages-angular';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  @ViewChild("clientForm") form: any

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  }

  disableBalanceOnAdd: boolean = false;

  constructor(
    private flashMessage : FlashMessagesService,
    private clientService:ClientService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  // deconstruct from NgForm type.
  onSubmit({value, valid} : {value: Client; valid:Boolean|null}){
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid){
      this.flashMessage.show('Please fill out form correctly', {
        cssClass: 'alert-danger', timeout: 3000
      })
    } else {
      this.clientService.addClient(value);
      this.flashMessage.show('Success', {
        cssClass: 'alert-success' , timeout: 3000
      })
      this.router.navigate(['/'])
    }
  }
}
