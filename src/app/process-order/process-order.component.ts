import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { Form } from '../form/model/form';
import { Order } from './model/order';
import { OrderService } from './order.service';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss'],
})
export class ProcessOrderComponent implements OnInit {

  form: Form;
  orders$: Observable<Array<Order>>;
  totalAmountToInvoice: number;
  isLoading = true;

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const loadOrders = (form) => this.orderService.find(form.customer, form.startDate, form.endDate).pipe(
      tap((orders: Array<Order>) => this.getTotalAmountToInvoice(orders))
    );

    this.orders$ = this.activatedRoute.queryParams.pipe(
      tap(() => this.isLoading = true),
      tap((form: Form) => this.form = form),
      switchMap((form: Form) => loadOrders(form)),
      tap(() => this.isLoading = false),
    );
  }

  private getTotalAmountToInvoice(orders: Order[]) {
    this.totalAmountToInvoice = orders.reduce((total: number, nextOrder: Order) => {
      return total + parseFloat(nextOrder.charge_customer.total_price);
    }, 0);
  }
}
