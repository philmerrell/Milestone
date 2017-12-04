import { Injectable } from '@angular/core';
import { AuthService, User } from '../core/auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Injectable()
export class LedgerService {
  user: User;
  user$: Observable<User>;
  ethLedger$: Observable<any>;

  constructor(private auth: AuthService, private db: AngularFirestore) {
    this.user$ = auth.user;
    auth.user.subscribe(user => {
      this.user = user;
      console.log(user);
    });
  }

  buy(purchase, currency) {
    purchase.timePurchased = firebase.firestore.FieldValue.serverTimestamp();
    purchase.currency = currency;
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${this.user.uid}`);
    return this.db.collection(`users/${this.user.uid}/ledger`).add(purchase);
  }

  deleteItem(id) {
    return this.db.collection(`users/${this.user.uid}/ledger`).doc(id)
      .delete().then(function() {
        console.log('Document successfully deleted!');
    }).catch(function(error) {
      console.error('Error removing document: ', error);
    });
  }

  getLedger() {
    return this.user$.switchMap(user => {
      if (user) {
        return this.db.collection(`users/${this.user.uid}/ledger`)
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
