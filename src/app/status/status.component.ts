import {  Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { distinct, Observable, take, takeLast, map, distinctUntilKeyChanged, mergeAll, toArray, of, concatAll, distinctUntilChanged } from 'rxjs';
import {StatusStore} from './status.store';
import { Order, StatusEnum } from '../shared/common';
import { StatusService } from './status.service';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
  providers: [StatusStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusComponent implements OnInit, OnDestroy {
  // DATA USED FOR PRESENTATION ONLY
  readonly status$ = this.ss.statusStore.state$.pipe(
      map(state => state.status),
    );

  public statusEnum = StatusEnum;

  constructor(public ss: StatusService) {}

  ngOnInit(): void {
    this.ss.statusStore.setState({status: []});
    this.ss.establishConnection();
    this.ss.listen();
  }

  logData(): void {
    this.ss.statusStore.$status.pipe(distinctUntilChanged()).pipe(take(5)).pipe().subscribe(x => console.log(x));
  }

  removeStatus(order: Order) {
    this.ss.removeStatus(order);
  }


  calculateProgress(order: Order): number|undefined {
    switch(order.status){
        case StatusEnum['Rejected']:{
          return 15;
        }
        case StatusEnum['Undefined']:{
          return 0;
        }
        case StatusEnum['Accepted']:{
          return 15;
        }
        case StatusEnum['Preparing'] :{
          return 30;
        }
        case StatusEnum['Ready']:{
          return 50;
        }
    }
  }

  ngOnDestroy(): void {
    this.ss.statusStore.setState({status: []});
  }

}
