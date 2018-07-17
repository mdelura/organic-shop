import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  constructor(private db: AngularFireDatabase) {
  }

  getAll(): Observable<Category[]> {
    return this.db.list('/categories', ref => ref.orderByChild('name'))
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => {
          return {
            value: action.key,
            name: action.payload.val()['name']
          };
        });
      });
  }
}


export interface Category {
  name: string;
  value: string;
}
