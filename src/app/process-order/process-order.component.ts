import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';

import { Form } from '../form/model/form';
import { Order } from './model/order';
import { OrderService } from './order.service';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProcessOrderComponent implements OnInit {

  form: Form;
  orders$: Observable<Array<Order>>;
  totalAmountToInvoice: number;

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.orders$ = this.activatedRoute.queryParams.pipe(
      delay(2000),
      tap((form: Form) => this.form = form),
      switchMap((form: Form) => this.orderService.find(form.customer, form.startDate, form.endDate).pipe(
        tap((orders: Array<Order>) => this.getTotalAmountToInvoice(orders))
      )));
  }

  private getTotalAmountToInvoice(orders: Order[]) {
    this.totalAmountToInvoice = orders.reduce((total: any, nextOrder: Order) => {
      return total + parseInt(nextOrder.charge_customer.total_price, 10);
    }, 0);
  }
}
