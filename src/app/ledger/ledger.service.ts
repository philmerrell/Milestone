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

  buy(purchase) {
    purchase.timePurchased = firebase.firestore.FieldValue.serverTimestamp();
    return this.db.collection(`users/${this.user.uid}/${purchase.currency}`).add(purchase);
  }

  deleteItem(item) {
    console.log(item);
    return this.db.collection(`users/${this.user.uid}/${item.curency}`).doc(item.id)
      .delete().then(function() {
        console.log('Document successfully deleted!');
    }).catch(function(error) {
      console.error('Error removing document: ', error);
    });
  }

  getLedger(currency) {
    console.log('currency', currency);
    return this.user$.switchMap(user => {
      if (user) {
        return this.db.collection(`users/${this.user.uid}/${currency}`)
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
