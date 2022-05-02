import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Status } from './status'

@Injectable()
export class StatusService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private baseURL = 'http://localhost:3000';
  constructor(private htttp: Http) { }
}
