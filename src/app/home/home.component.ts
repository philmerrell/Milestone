import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { HomeService } from './home.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  rooms$;

  constructor(
    public auth: AuthService) { }

  ngOnInit() {}

}
