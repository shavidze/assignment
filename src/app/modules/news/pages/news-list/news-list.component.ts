import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromNews from '../../store/reducers';
import {map, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit, OnDestroy {
  private FILTERS = 'filters';
  private destruct$ = new Subject();
  private data$: Observable<any>;
  private filters$ = new BehaviorSubject({
    searchKey: '',
    sort: {
      name: 'id',
      isAscending: true
    },
    itemsPerPage: 5,
    page: 1
  });

  constructor(private store: Store<fromNews.State>) {
    this.data$ = combineLatest(
      this.store.pipe(
        takeUntil(this.destruct$),
        select(fromNews.news.items)
      ),
      this.filters$
    ).pipe(
      map(([items, filters]) => {
        localStorage.setItem(this.FILTERS, JSON.stringify(filters));
        if (filters.searchKey) {
          items = items.filter(x =>
            x.userName.toLowerCase().includes(filters.searchKey.toLowerCase())
          );
        }

        if (filters.sort.name) {
          const {name, isAscending} = filters.sort;

          items = items.sort((a, b) => {
            if (a[name] === b[name]) {
              return 0;
            }
            if (isAscending) {
              return a[name] - b[name] > 0 ? 1 : -1;
            } else {
              return b[name] - a[name] > 0 ? 1 : -1;
            }
          });
        }

        return items;
      })
    );
  }

  ngOnInit() {
    const savedFilters = localStorage.getItem(this.FILTERS);
    if (savedFilters) {
      this.filters$.next(JSON.parse(savedFilters));
    }
  }

  ngOnDestroy(): void {
    this.destruct$.next();
  }

  changeSearchKey(key: string) {
    this.filters$.next({
      ...this.filters$.value,
      searchKey: key
    });
  }

  changeSort(columnName: string) {
    const currentValue = this.filters$.value;

    this.filters$.next({
      ...currentValue,
      sort: {
        name: columnName,
        isAscending:
          currentValue.sort.name === columnName
            ? !currentValue.sort.isAscending
            : false
      }
    });
  }

  changePage(page) {
    this.filters$.next({
      ...this.filters$.value,
      page: page
    });
  }
}
