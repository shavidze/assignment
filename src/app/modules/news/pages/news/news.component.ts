import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {GetNewsList} from '../../store/actions/news.actions';
import * as fromNews from '../../store/reducers';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  constructor(private store: Store<fromNews.State>) {
  }

  ngOnInit() {
    this.store.dispatch(new GetNewsList());
  }
}
