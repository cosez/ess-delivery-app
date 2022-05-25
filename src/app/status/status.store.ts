import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { Order } from '../shared/common';

export interface OrderState {
  order: Order[];
}

@Injectable()
export class StatusStore extends ComponentStore<OrderState>  {

  constructor() {
    super({order: []});
  }

  readonly status$: Observable<Order[]> = this.select(state => state.order);

}
