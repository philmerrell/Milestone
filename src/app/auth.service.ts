import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireDatabase, FirebaseAuthState, AuthProviders, AuthMethods, AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

import * as firebase from 'firebase';


@Injectable()
export class AuthService {

  authState: FirebaseAuthState = null;

  constructor(private af: AngularFire,
              private db: AngularFireDatabase,
              private router: Router) {

            af.auth.subscribe((auth) => {
              this.authState = auth;
            });
          }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user
  get currentUser(): any {
    return this.authenticated ? this.authState.auth : null;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.anonymous : false;
  }

  //// Social Auth ////
  githubLogin(): firebase.Promise<FirebaseAuthState> {
    return this.socialSignIn(AuthProviders.Github);
  }

  googleLogin(): firebase.Promise<FirebaseAuthState> {
    return this.socialSignIn(AuthProviders.Google);
  }

  facebookLogin(): firebase.Promise<FirebaseAuthState> {
    return this.socialSignIn(AuthProviders.Facebook);
  }

  twitterLogin(): firebase.Promise<FirebaseAuthState> {
    return this.socialSignIn(AuthProviders.Twitter);
  }

  private socialSignIn(provider: number): firebase.Promise<FirebaseAuthState> {
    return this.af.auth.login({provider, method: AuthMethods.Popup})
      .then(() => this.updateUserData() )
      .catch(error => console.log(error));
  }


  //// Anonymous Auth ////
  anonymousLogin() {
    return this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous,
    })
    .then(() => this.updateUserData())
    .catch(error => console.log(error));
  }


  //// Email/Password Auth ////
  emailSignUp(email: string, password: string): firebase.Promise<FirebaseAuthState> {
    return this.af.auth.createUser({
        email: email,
        password: password,
      })
      .then(() => this.updateUserData())
      .catch(error => console.log(error));
  }

  emailLogin(email: string, password: string): firebase.Promise<FirebaseAuthState> {
     return this.af.auth.login({ email, password },
       { provider: AuthProviders.Password,
         method: AuthMethods.Password
        })
       .then(() => this.updateUserData())
       .catch(error => console.log(error));
  }

  //// Sign Out ////
  signOut(): void {
    this.af.auth.logout();
    this.router.navigate(['/']);
  }


  //// Helpers ////
  private updateUserData(): void {
  // Writes user name and email to realtime db
  // useful if your app displays information about users or for admin features
    let path = `users/${this.currentUserId}`; // Endpoint on firebase
    let data = {
                 name: this.currentUser.displayName,
                 email: this.currentUser.email,
               };

    this.db.object(path).update(data)
    .catch(error => console.log(error));

  }
}
