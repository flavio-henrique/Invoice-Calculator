import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatSelectModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatIconModule,
        MatProgressSpinnerModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [FormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    router = fixture.debugElement.injector.get(Router);
    route = fixture.debugElement.injector.get(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form', () => {
    component.formGroup.controls.customer.setValue('customer 1');
    component.formGroup.controls.startDate.setValue(new Date('2019-03-01T03:00:00.000Z'));
    component.formGroup.controls.endDate.setValue(new Date('2019-03-31T03:00:00.000Z'));
    spyOn(router, 'navigate');

    component.onSubmit(component.formGroup.value);

    const expectedData = {
      customer: 'customer 1',
      startDate: '2019-03-01T03:00:00.000Z',
      endDate: '2019-03-31T03:00:00.000Z'
    };
    expect(router.navigate).toHaveBeenCalledWith(['process-order'], { relativeTo:  route, queryParams: expectedData });
  });

});
