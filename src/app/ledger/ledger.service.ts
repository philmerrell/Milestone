import { Injectable } from '@angular/core';
import { AuthService, User } from '../core/auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Injectable()
export class LedgerService {
  user: User;
  user$: Observable<User>;
  userDoc: any;
  docRef;

  constructor(private auth: AuthService, private db: AngularFirestore) {
    this.user$ = auth.user;
    auth.user.subscribe(user => {
      this.user = user;
      this.getDocRef();
      this.getDocData();
    });


  }

  getDocData() {
    this.docRef.valueChanges()
      .subscribe(doc => {
        this.userDoc = doc;
      });
  }

  getDocRef() {
    this.docRef = this.db.collection(`users`).doc(`${this.user.uid}`);
  }

  buy(purchase) {
    const currentTotal = this.userDoc[purchase.currency] || 0;
    const amount =  currentTotal + purchase.amount;
    let update = {};
    update[purchase.currency] = amount;
    this.docRef.update(update);
    purchase.timePurchased = firebase.firestore.FieldValue.serverTimestamp();
    return this.docRef
      .collection(`${purchase.currency}`)
      .add(purchase);
  }

  debt(currency) {
    const currentTotal = this.userDoc['USD'] || 0;
    console.log(currentTotal);
    const amount =  currentTotal + currency.amount;
    console.log(amount);
    let update = {};
    update['USD'] = amount;
    this.docRef.update(update);
    return this.docRef
      .collection(`USD`)
      .add(currency);
  }

  deleteItem(item) {
    return this.docRef.collection(item.currency).doc(item.id)
      .delete().then(function(del) {
        console.log(del, 'Document successfully deleted!');
    }).catch(function(error) {
      console.error('Error removing document: ', error);
    });
  }

  getLedger(currency) {
    return this.user$.switchMap(user => {
      if (user) {
        return this.docRef.collection(`/${currency}`)
          .snapshotChanges().map(actions => {
            return actions.map(action => {
              const data = action.payload.doc.data();
              const id = action.payload.doc.id;
              return { id, ...data };
            });
          });
      } else {
        return Observable.of(null);
      }
    });
  }

}
