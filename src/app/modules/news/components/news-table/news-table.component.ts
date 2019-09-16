import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as fromNews from '../../store/reducers';
import {
  faArrowUp,
  faArrowDown,
  faPlusCircle,
  faTrash,
  faPen
} from '@fortawesome/free-solid-svg-icons';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {GetNewsList} from '../../store/actions/news.actions';

@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.scss']
})
export class NewsTableComponent implements OnInit {
  public icons = {
    arrowUp: faArrowUp,
    arrowDown: faArrowDown,
    addIcon: faPlusCircle,
    delete: faTrash,
    edit: faPen
  };

  @Input()
  public data: any[];

  @Input()
  public filters: any;

  @Output()
  public onChangeAscending: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public onKeyUp: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onPageClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private store: Store<fromNews.State>
  ) {
  }

  ngOnInit() {
  }

  public changeAscending(columnName) {
    this.onChangeAscending.emit(columnName);
  }

  getColumnSortIcon(columnName) {
    return this.filters.sort.name === columnName
      ? this.filters.sort.isAscending
        ? this.icons.arrowUp
        : this.icons.arrowDown
      : this.icons.arrowUp;
  }

  keyUp(event) {
    this.onKeyUp.emit(event.target.value);
  }

  get pages() {
    const totalPages = Math.ceil(this.data.length / this.filters.itemsPerPage);
    return Array(totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  pageClicked(page) {
    this.onPageClicked.emit(page);
  }

  updateStore() {
    this.store.dispatch(new GetNewsList());
    this.router.navigate(['news']);
  }

  deleteNews(id: number) {
    this.httpClient.delete('/news/' + id).subscribe(res => {
      if ((this.data.length - 1) % this.filters.itemsPerPage === 0) {
        this.pages.pop();
        if (this.pages.length === 0) {
          this.pages.push(0);
        }
        this.pageClicked(1);
      }
      this.updateStore();
    });
  }
}
