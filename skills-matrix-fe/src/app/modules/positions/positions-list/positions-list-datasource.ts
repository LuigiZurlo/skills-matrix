import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import {PositionService} from "../../../services/position/position.service";

export interface PositionsListItem {
  id: number;
  project_id: number;
  project_name: string;
  position_name: string;
  description: string;
}

/**
 * Data source for the PositionsList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PositionsListDataSource extends DataSource<PositionsListItem> {

  data: PositionsListItem[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private positionService: PositionService) {
    super();
    this.fetchPositions();
  }

  private fetchPositions() {
    this.positionService.getPositions().subscribe( (positions: any) => {
      this.data = positions.data;
      console.log('Positions requested');
      console.log(this.data);
    });
  };

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<PositionsListItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: PositionsListItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: PositionsListItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'project_name': return compare(a.project_name, b.project_name, isAsc);
        case 'position_name': return compare(a.position_name, b.position_name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'project_id': return compare(+a.project_id, +b.project_id, isAsc)
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
