import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CustomerService } from './customer.service';
import { Customer } from './model/customer';
import { Form } from './model/form';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {


  formGroup: FormGroup;
  customers$: Observable<Array<Customer>>;
  form$: Observable<Form>;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.customers$ = this.customerService.findAll();
    this.form$ = this.route.queryParams.pipe(
      tap((form: Form) => this.fillUpForm(form))
    );
  }

  private fillUpForm(form: Form) {
    this.formGroup = this.formBuilder.group({
      customer: [form.customer],
      startDate: [form.startDate],
      endDate: [form.endDate]
    });
  }

  private parseToIsoStringDate(form: Form) {
    const formCloned = { ...form };
    formCloned.startDate = new Date(form.startDate).toISOString();
    formCloned.endDate = new Date(form.endDate).toISOString();
    return formCloned;
  }

  onSubmit(data: any) {
    this.router.navigate(['process-order'], { relativeTo:  this.route, queryParams: this.parseToIsoStringDate(data) });
  }

}
