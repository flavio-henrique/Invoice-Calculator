import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatTableModule } from '@angular/material';

import { Item } from '../model/order';
import { ItemDialogComponent } from './item-dialog.component';

describe('ItemDialogComponent', () => {
  let component: ItemDialogComponent;
  let fixture: ComponentFixture<ItemDialogComponent>;
  const data: Array<Item> = [{
    id: 'item-1',
    name: 'Supersoaker 3000',
    quantity: 2,
    total_price: {
      currency: 'EUR',
      amount: '24.33'
    }
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatTableModule
      ],
      declarations: [ItemDialogComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: data }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
