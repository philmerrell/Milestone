import { Injectable } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoomService {
  user$;
  user;
  roomsRef;
  roomRef;
  userRef;


  constructor(private auth: AuthService, private db: AngularFirestore) {
    this.user$ = auth.user;
    auth.user.subscribe(user => {
      this.user = user;
      this.getRoomsRef();
      this.getUserRef();
    });

  }

  getRoom(id) {
    this.roomRef = this.db.doc(`rooms/${id}`);
    return this.roomRef.valueChanges();
  }

  getRoomMessages() {
    return this.roomRef.collection('messages').valueChanges();
  }

  addRoomMessage(text) {
    let msg = {
      from: this.user.displayName,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      msg: text
    };
    this.roomRef.collection('messages')
      .add(msg);
  }

  getRooms() {
    return this.user$.switchMap(user => {
      if (user) {
        return this.db.collection(`users/${user.uid}/rooms`)
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

  getRoomsRef() {
    this.roomsRef = this.db.collection(`rooms`);
  }

  getUserRef() {
    this.userRef = this.db.doc(`users/${this.user.uid}`);
  }

  createRoom(info) {
    info.creator = this.user.uid;
    info.timeCreated = firebase.firestore.FieldValue.serverTimestamp();
    return this.roomsRef
      .add(info)
      .then(result => {
        this.userRef.collection('rooms')
          .add({id: result.id, name: info.name});
      });
  }

}
