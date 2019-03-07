import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Item } from '../model/order';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss']
})
export class ItemDialogComponent implements OnInit {

  dataSource: Array<Item>;
  displayedColumns: string[] = ['id', 'name', 'quantity', 'price', 'currency'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Array<Item>) {
    this.dataSource = data;
  }

  ngOnInit() {
  }

}
