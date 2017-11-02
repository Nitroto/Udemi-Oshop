import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {ShoppingCartService} from './shopping-cart.service';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase,
              private shoppingCartService: ShoppingCartService) {
  }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders').snapshotChanges().map(actions => {
      return actions.map(action => this.mapping(action));
    });
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders',
      ref => ref.orderByChild('userId')
        .equalTo(userId)).valueChanges();
  }

  private mapping(act) {
    let data = act.payload.val();
    let key = act.key;
    return {key, ...data};
  }
}
