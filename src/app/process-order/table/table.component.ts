import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';

import { Order } from '../model/order';
import { OrderDataSource } from './order-datasource';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: OrderDataSource;
  @Input() orders: Array<Order>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'customerName', 'customerEmail', 'created_at', 'courierDelivery', 'deliveryMethod', 'totalPrice'];

  constructor() {

  }

  ngOnInit() {
    this.dataSource = new OrderDataSource(this.paginator, this.sort, this.orders);
  }
}
