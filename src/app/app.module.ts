import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { MaterialModule } from './material/material.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthService } from './core/auth/auth.service';
import { RouterModule, Routes } from '@angular/router';
import { WebsocketService } from './websocket.service';
import { LivePriceModule } from './live-price/live-price.module';
import { LedgerModule } from './ledger/ledger.module';
import { LedgerComponent } from './ledger/ledger.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { GdaxService } from './core/gdax.service';
import { AuthGuard } from './core/auth/auth.guard';
import { LedgerService } from './ledger/ledger.service';
import { LivePriceService } from './live-price/live-price.service';
import { LoginComponent } from './login/login.component';
import { RoomsModule } from './rooms/rooms.module';
import { HomeModule } from './home/home.module';
import { HomeComponent } from './home/home.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomComponent } from './rooms/room/room.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'wallet/:id', component: LedgerComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'rooms/:id', component: RoomComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    LoginComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HomeModule,
    HttpClientModule,
    LedgerModule,
    FlexLayoutModule,
    LivePriceModule,
    MaterialModule,
    RoomsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthGuard,
    AuthService,
    LivePriceService,
    // GdaxService,
    LedgerService,
    GdaxService,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
