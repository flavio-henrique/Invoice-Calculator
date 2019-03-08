import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort } from '@angular/material';

import { ItemDialogComponent } from '../item-dialog/item-dialog.component';
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
  displayedColumns = ['id', 'customerName', 'customerEmail', 'created_at', 'courierDelivery', 'deliveryMethod', 'totalPrice', 'items'];

  constructor(public dialog: MatDialog) {

  }

  openModal(order: Order) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = order.items;
    dialogConfig.width = '700px';
    this.dialog.open(ItemDialogComponent, dialogConfig);
  }

  ngOnInit() {
    this.dataSource = new OrderDataSource(this.paginator, this.sort, this.orders);
  }
}
