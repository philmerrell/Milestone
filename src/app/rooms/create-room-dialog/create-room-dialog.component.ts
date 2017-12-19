import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent, MatDialogRef } from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';


@Component({
  selector: 'create-room-dialog',
  templateUrl: './create-room-dialog.component.html',
  styleUrls: ['./create-room-dialog.component.scss']
})
export class CreateRoomDialogComponent implements OnInit {
  room = {
    name: '',
    invitees: []
  };
  separatorKeysCodes = [ENTER, COMMA];
  constructor(public dialogRef: MatDialogRef<CreateRoomDialogComponent>) { }

  ngOnInit() {
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    if ((value || '').trim()) {
      this.room.invitees.push({ email: value.trim() });
    }

    if (input) {
      input.value = '';
    }
  }

  createRoom() {
    this.dialogRef.close(this.room);
  }


  remove(email: any): void {
    const index = this.room.invitees.indexOf(email);

    if (index >= 0) {
      this.room.invitees.splice(index, 1);
    }
  }

}
