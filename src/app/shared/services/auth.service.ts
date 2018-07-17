import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { auth } from 'firebase';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.user$ = afAuth.authState;
   }

  login() {
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        return user
          ? this.userService.get(user.uid).valueChanges()
          : Observable.of(null);
      });
  }
}
