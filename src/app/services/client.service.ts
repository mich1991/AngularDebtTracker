import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, collection, collectionData,
  doc, docData, CollectionReference, deleteDoc, updateDoc, DocumentReference, setDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client } from '../models/client';



@Injectable({
  providedIn: 'root'
})

export class ClientService {
  clientsCollection: CollectionReference<Client>;
  // client: Observable<Client>;
  // clients: Observable<Client[]> = []


  constructor(private firestore: Firestore) {
     this.clientsCollection = collection(this.firestore, 'clients');
  }
  getClients(){
    const clients = collectionData(this.clientsCollection, {idField: 'id'}) as Observable<Client[]>;
    return clients
  }
  getClient(id:string){
    const clientRef = doc(this.clientsCollection, id);
    return docData(clientRef, {idField:'id'}) as Observable<Client>;
  }
  addClient(client:Client){
    return addDoc(this.clientsCollection, client)
  }
  updateClient(client:Client){
    const clientRef = doc(this.clientsCollection, client.id);
    return setDoc(clientRef, client)    
  }

}
