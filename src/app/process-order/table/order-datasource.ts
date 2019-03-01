import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Order } from '../model/order';

/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class OrderDataSource extends DataSource<Order> {
  data: Array<Order>;

  constructor(
    private paginator: MatPaginator,
    private sort: MatSort,
    orders: Order[]
  ) {
    super();
    this.data = orders;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Array<Order>> {
    const dataMutations = [
      of(this.data),
      this.sort.sortChange,
      this.paginator.page
    ];

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }

  disconnect() { }

  private getPagedData(data: Array<Order>) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: Array<Order>) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'created_at': return compare(a.created_at, b.created_at, isAsc);
        case 'id': return compare(a.id, b.id, isAsc);
        case 'customerName': return compare(a.id, b.id, isAsc);
        case 'customerEmail': return compare(a.id, b.id, isAsc);
        case 'courierDelivery': return compare(a.id, b.id, isAsc);
        case 'deliveryMethod': return compare(a.id, b.id, isAsc);
        case 'totalPrice': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
