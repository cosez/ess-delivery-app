import { Injectable, Input, Output } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { filter, fromEvent, Observable, of, switchMap, take, distinctUntilChanged, distinct, distinctUntilKeyChanged, tap, generate, map, shareReplay, mergeAll, concatAll, from, pluck }  from 'rxjs';
import { Order, StatusEnum } from '../shared/common';
import { StatusStore } from './status.store';

const socket = io("ws://localhost:9220");

@Injectable({
  providedIn: 'root',
})
export class StatusService {
    testData: Order =  {
      name : "Ana",
      id : 2050,
      order_name : "batata recheada",
      restaurant : "Casa da batata",
      status : StatusEnum['Accepted']
    }

  constructor (public statusStore: StatusStore) {}

  listen(): void{
    socket.on('dispatch',(msg) => {
      this.statusStore.insertStatus(of(msg));
    });
  }


  establishConnection(){
    socket.emit('advance',this.testData);
  }

  establishDisconnection(){
    socket.disconnect();
  }

  removeStatus(order: Order){
    this.statusStore.removeStatus(order);
  }

  //UTILITIY METHODS
  // getStatus(){
  //   socket.emit('actual', this.orderStream$);
  // }

  // resetStatus(){
  //   socket.emit('reset', this.orderStream$);
  // }

  // demoteStatus(){
  //   socket.emit('advance', this.orderStream$);
  // }

  // promoteStatus(){
  //   socket.emit('regress', this.orderStream$);
  // }

}
