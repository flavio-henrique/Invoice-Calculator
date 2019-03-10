import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatTableModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MomentModule } from 'ngx-moment';
import { of } from 'rxjs';

import { ProcessOrderComponent } from './process-order.component';
import { TableComponent } from './table/table.component';

describe('ProcessOrderComponent', () => {
  let component: ProcessOrderComponent;
  let fixture: ComponentFixture<ProcessOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatCardModule,
        MomentModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ProcessOrderComponent, TableComponent],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          queryParams: of({
            customer: 'customer 1',
            startDate: '2019-03-01T03:00:00.000Z',
            endDate: '2019-03-31T03:00:00.000Z'
          })
        }
      }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
