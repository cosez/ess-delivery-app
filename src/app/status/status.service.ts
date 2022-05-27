import { Injectable, Input, Output } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { filter, fromEvent, Observable, of, switchMap, take, distinctUntilChanged, distinct, distinctUntilKeyChanged, tap, generate, map, shareReplay, mergeAll, concatAll, from, pluck }  from 'rxjs';
import { Order, StatusEnum } from '../shared/common';
import { StatusStore } from './status.store';

const socket = io("ws://localhost:9339");

@Injectable({
  providedIn: 'root',
})
export class StatusService {
    testData: Order =  {
      name : "Ana",
      id : 2050,
      order_name : "batata recheada",
      restaurant : "Casa da batata",
      status : StatusEnum['Undefined']
    }

  constructor (public statusStore: StatusStore) {}

  listen(): void{
    socket.timeout(50000).on('dispatch',(msg) => {
      this.statusStore.insertStatus(of(msg));
      socket.emit('forward-server',of(msg)); // Update 'bot' state
    });
  }

  establishConnection(){
    socket.emit('forward-server',this.testData);
    socket.emit('advance-test',0);
    // socket.emit('choice',1);
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
