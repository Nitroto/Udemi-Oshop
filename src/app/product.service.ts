import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) {
  }

  create(product) {
    return this.db.list('/products').push(product);
  }

  private mapping(act) {
    const data = act.payload.val();
    const key = act.key;
    return {key, ...data};
  }

  getAll() {
    return this.db.list('/products').snapshotChanges().map(actions => {
      return actions.map(action => this.mapping(action));
    });
  }

  get(productId) {
    return this.db.object('/products/' + productId).snapshotChanges().map(action => this.mapping(action));
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
