import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages$;
  msg;

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.getRoomMessages();
  }

  getRoomMessages() {
    this.messages$ = this.roomService.getRoomMessages();
  }

  sendMessage() {
    this.roomService.addRoomMessage(this.msg);
  }

}
