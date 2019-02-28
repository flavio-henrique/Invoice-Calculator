import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { OrderService } from './order.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Form } from '../form/model/form';
import { delay, map, tap, merge, switchMap } from 'rxjs/operators';
import { Order } from './model/order';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProcessOrderComponent implements OnInit {

  form$: Observable<Form>;
  orders$: Observable<Array<Order>>;

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const observable = this.activatedRoute.queryParams.pipe(
      delay(2000),
      map((form: Form) => form),
      switchMap((form: Form) => of([form, this.orderService.find(form.customer, form.startDate, form.endDate)]))
    );
    this.form$ = observable.pipe(map(([form]) => form)) as Observable<Form>;
    this.form$.subscribe(console.log)
    this.orders$ = observable.pipe(map(([, orders]) => orders)) as unknown as Observable<Array<Order>>;
    this.orders$.subscribe(console.log);
  }

}
