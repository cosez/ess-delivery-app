import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import { AuthenticationService } from '../service/authentication/authentication.service';
import { NgModule } from '@angular/core';


import { Status } from './status';
import { StatusService } from './status.service'

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  constructor(private statusService: StatusService) { }

  status: Status = new Status

  statusList: Status[] = [];

  ngOnInit(): void {
    this.statusService.getStatusList()
      .then(results => this.statusList = results)
      .catch(erro => alert(erro));
  }
  createDummyOrder(order: Status): void {
    this.statusService.updateStatusList(order)
      .then(result => {
        if (result) {
          this.statusList.push(<Status>result)
        }
      })
      .catch(error => alert(error));
  }
  updateStatus(order: Status): void {
    this.statusList.map(statusTest => (statusTest.id == order.id ? statusTest = order : statusTest));
  }
  }
}
