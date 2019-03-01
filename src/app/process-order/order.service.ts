import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { environment as env } from '../../environments/environment';
import { Item, Order } from './model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public find(customerId: string, startDate: string | Date, endDate: string | Date): Observable<Array<Order>> {
    const params = new HttpParams()
      .set('start_date', startDate.toString())
      .set('end_date', endDate.toString());
    const url = `${env.baseUrl}/orders/${customerId}`;
    return this.http.get<Array<Order>>(url, { params }).pipe(
      delay(2000),
      map((orders: Array<Order>) => orders.map((order) => this.setTotalItemPrice(order)))
    );
  }

  private setTotalItemPrice(order: Order) {
    order.totalItemPrice = order.items.reduce((total: number, item: Item) => {
      return total + parseFloat(item.total_price.amount);
    }, 0);
    return order;
  }
}
