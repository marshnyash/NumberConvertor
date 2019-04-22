import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getLastString(){
      return this.db.collection('formattedNumberCollection').valueChanges();
  }

 createNewRecord(value, stringValue){
    return this.db.collection('formattedNumberCollection').add({
      number: value,
      stringNumber: stringValue
    });
  }
}