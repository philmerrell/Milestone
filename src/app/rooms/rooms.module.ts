import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomsComponent } from './rooms.component';
import { RoomComponent } from './room/room.component';
import { MaterialModule } from '../material/material.module';
import { RoomService } from './room.service';
import { CreateRoomDialogComponent } from './create-room-dialog/create-room-dialog.component';
import { RouterModule } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule
  ],
  declarations: [
    CreateRoomDialogComponent,
    RoomsComponent,
    RoomComponent,
    MessagesComponent
  ],
  entryComponents: [
    CreateRoomDialogComponent
  ],
  providers: [
    RoomService
  ]
})
export class RoomsModule { }
