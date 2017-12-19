import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../room.service';

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  room$;

  constructor(private roomService: RoomService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.room$ = this.route.paramMap.switchMap((params: ParamMap) => {
      const param = params.get('id');
      if (param) {
        return this.getRoom(params.get('id'));
      }
    });
  }

  getRoom(id) {
    return this.roomService.getRoom(id);
  }

}
