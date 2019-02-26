import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { OrderService } from './order.service';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProcessOrderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
