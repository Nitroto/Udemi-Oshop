import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) {
  }

  getAll() {
    return this.db.list('/categories',
      ref => ref.orderByChild('name'))
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => {
          const data = action.payload.val();
          const key = action.key;
          return {key, ...data};
        });
      });
  }
}
