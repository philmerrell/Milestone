import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { routerTransition } from './core/animations/router-animation';
import { AuthService } from './core/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerTransition]
})
export class AppComponent {
  title = 'Milestone';

  constructor(public auth: AuthService) {
  }


}
