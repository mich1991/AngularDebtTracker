import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Client } from 'src/app/models/client';

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

  constructor() { }

  ngOnInit(): void {
  }

  // deconstruct from NgForm type.
  onSubmit({value, valid} : {value: Client; valid:Boolean|null}){
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
  }
}
