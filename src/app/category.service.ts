import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {
  }

  getCategories(): Observable<{ name: string, value: string }[]> {
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
