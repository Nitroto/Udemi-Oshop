import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AppUser} from '../models/app-user';
import * as firebase from 'firebase';
import {} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) {
  }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): Observable<AppUser> {
    return this.db.object('/users/' + uid).valueChanges();
  }
}