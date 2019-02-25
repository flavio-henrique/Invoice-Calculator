import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from './model/order';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) { }

  public find(customerId: number, startDate: string, endDate: string): Observable<Array<Order>> {
    const params = new HttpParams()
      .set('start_date', startDate)
      .set('end_date', endDate);
    return this.http.get<Array<Order>>(`${environment.baseUrl}/orders/${customerId}`, { params: params });
  }
}
