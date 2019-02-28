import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap, delay } from 'rxjs/operators';
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
      delay(2000),
      map((form: Form) => this.parseToDateObject(form)),
      tap(form => this.fillUpForm(form))
    );
  }

  private fillUpForm(form: Form) {
    this.formGroup = this.formBuilder.group({
      'customer': [form.customer],
      'startDate': [form.startDate],
      'endDate': [form.endDate]
    });
  }

  private parseToDateObject(form: Form) {
    const formCloned = { ...form };
    formCloned.startDate = new Date(form.startDate);
    formCloned.endDate = new Date(form.endDate);
    return formCloned;
  }

  onSubmit(data: any) {
    console.log(data);
    this.router.navigate(['process-order'], { relativeTo:  this.route, queryParams: data });
  }

}
