import { Component, OnInit, ViewChild } from '@angular/core';

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

  onSubmit({value, valid} : {value: Client; valid:Boolean|null}){
    console.log(value)
    console.log(valid)
  }
  
}
