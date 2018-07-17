import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product, KeyedProduct } from 'shared/models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private db: AngularFireDatabase) { }

  create(product) {
    this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges();
  }

  getAllProducts(): Observable<Product[]> {
    return this.db.list('/products').valueChanges() as Observable<Product[]>;
  }

  getAllKeyedProducts(): Observable<KeyedProduct[]> {
    return this.getAll()
      .map(actions => {
        return actions.map(action => {
          const product = action.payload.val() as Product;
          return {
            key: action.key,
            title: product.title,
            price: product.price,
            category: product.category,
            imageUrl: product.imageUrl
          };
        });
      });
  }

  get(productId) {
    return this.db.object(`/products/${productId}`).valueChanges();
  }

  update(productId, product) {
    return this.db.object(`/products/${productId}`).update(product);
  }

  delete(productId) {
    return this.db.object(`/products/${productId}`).remove();
  }
}
