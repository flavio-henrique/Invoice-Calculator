import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { CustomerService } from './customer.service';
import { Customer } from './model/customer';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CustomerService]
})
export class FormComponent implements OnInit {


  formGroup: FormGroup;
  customers$: Observable<Array<Customer>>;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService
    ) { 
    }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      'customer': [null],
      'startDate': [null],
      'endDate': [null]
    });
    this.customers$ = this.customerService.findAll();
  }

  onSubmit(data: any) {
    console.log(data);
  }

}
