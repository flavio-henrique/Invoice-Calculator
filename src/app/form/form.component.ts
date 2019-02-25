import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {


  formGroup: FormGroup;
  foods = [{
    value: "test",
    viewValue: "test"
  }];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      'customer': [null],
      'startDate': [null],
      'endDate': [null]
    });
  }

  onSubmit(data: any) {
    console.log(data);
  }

}
