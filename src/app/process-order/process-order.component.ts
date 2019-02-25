import { Component, OnInit } from '@angular/core';

import { OrderService } from './order.service';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss'],
  providers: [OrderService]
})
export class ProcessOrderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
