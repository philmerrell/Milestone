import { Injectable } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';


@Injectable()
export class HomeService {
  roomRef;
  userRef;
  user$;
  user;

  constructor(private auth: AuthService, private db: AngularFirestore) {
    this.user$ = auth.user;
    auth.user.subscribe(user => {
      this.user = user;
      this.getRoomRef();
      this.getUserRef();
    });


  }

  getRoomRef() {
    this.roomRef = this.db.collection(`rooms`);
  }

  getUserRef() {
    this.userRef = this.db.doc(`users/${this.user.uid}`);
  }

  getUserRooms() {
    return this.userRef.collection('rooms').valueChanges();
  }

  createRoom(info) {
    info.creator = this.user.uid;
    info.timeCreated = firebase.firestore.FieldValue.serverTimestamp();
    return this.roomRef
      .add(info)
      .then(result => {
        this.userRef.collection('rooms')
          .add({id: result.id, name: info.name});
      });
  }


}
