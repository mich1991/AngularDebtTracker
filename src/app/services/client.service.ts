import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})

export class ClientService {
  clientsCollection: Client[] =[]
  // client: Observable<Client>;
  // clients: Observable<Client[]> = []


  constructor(private firestore: Firestore) {

  }
  getClients(){
    const clientsRef = collection(this.firestore, 'clients');
    const clients = collectionData(clientsRef, {idField: 'id'}) as Observable<Client[]>;
    return clients
  }
}
