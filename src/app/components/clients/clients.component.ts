import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: Client[] = [];
  totalOwed?: number;
  constructor(private clientService : ClientService) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.getTotalOwed();
    })
  }

  getTotalOwed(){
    const total= this.clients.reduce((total, client) => total + +client.balance! , 0)
    this.totalOwed = total;
  }

}
