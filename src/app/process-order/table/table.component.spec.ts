import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Order } from '../model/order';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  const orders: [Order] = [
    {
      id: 'order-1',
      recipient: {
        name: 'John Smith',
        email: 'j.smith@notgmail.com'
      },
      created_at: '2018-11-01T09:42:30Z',
      items: [
        {
          id: 'item-1',
          name: 'Supersoaker 3000',
          quantity: 2,
          total_price: {
            currency: 'EUR',
            amount: '24.33'
          }
        },
        {
          id: 'item-2',
          name: 'Nunchucks XXX',
          quantity: 1,
          total_price: {
            currency: 'EUR',
            amount: '39.99'
          }
        }
      ],
      delivery: {
        courier: 'DPP',
        method: 'Express'
      },
      charge_customer: {
        currency: 'EUR',
        total_price: '18.00'
      }
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatDialogModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.orders = orders;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
