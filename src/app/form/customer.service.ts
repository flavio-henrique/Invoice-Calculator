import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Customer } from './model/customer';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {

  }

  public findAll(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(`${environment.baseUrl}/customers`).pipe(delay(2000));
  }
}