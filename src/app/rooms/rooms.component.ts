import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { HomeService } from '../home/home.service';
import { MatDialog } from '@angular/material';
import { CreateRoomDialogComponent } from './create-room-dialog/create-room-dialog.component';
import { RoomService } from './room.service';

@Component({
  selector: 'rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  rooms$;

  constructor(
    public auth: AuthService,
    private roomService: RoomService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getRooms();
  }

  createRoom(info) {
    this.roomService.createRoom(info);
  }

  getUserRooms() {
    this.rooms$ = this.roomService.getRooms();
  }

  getRooms() {
    this.rooms$ = this.roomService.getRooms();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateRoomDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.createRoom(result);
      }
    });
  }


}
