import {Injectable, Input} from '@angular/core';
import { Order } from '../shared/common';
import { ComponentStore} from '@ngrx/component-store';
import {catchError, merge, mergeAll, Observable, pluck, } from 'rxjs';

export interface StatusState {
  status: Order[];
}

@Injectable()
export class StatusStore extends ComponentStore<StatusState> {

  constructor() {
    super({status: []});
  }

  //Use this in the html ngFor
  readonly $status: Observable<Order[]> = this.select(state => state.status);

  readonly $giveFirst5: Observable<Order[]> = this.select(state => state.status);

  readonly $giveLast10: Observable<Order[]> = this.select(state => state.status.slice(0,-10));

  // update the store with new status entries
  insertStatus = this.updater((state, status: Order) => ({
    status: [...state.status,status],
  }))

  // remove an entry from the store
  removeStatus = this.updater((state, status: Order) => ({
    status: state.status.filter(x=>x!=status),
  }))

}
