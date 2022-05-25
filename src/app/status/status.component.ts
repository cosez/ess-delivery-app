import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Order } from '../shared/common';
import { StatusStore } from './status.store';

export interface OrderState {
  order: Order[];
}

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
  providers: [StatusStore]
})
export class StatusComponent  {

  constructor(private readonly statusStore: StatusStore) {}

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  ngAfterViewInit(): void {

  }


}
