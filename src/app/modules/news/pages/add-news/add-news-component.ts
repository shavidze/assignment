import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromNews from '../../store/reducers';
import {HttpClient} from '@angular/common/http';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {GetNewsList} from '../../store/actions/news.actions';

@Component({
  selector: 'app-add-news-component',
  templateUrl: './add-news-component.html',
  styleUrls: ['./add-news-component.scss']
})
export class AddNewsComponent implements OnInit {
  private id: number = null;

  addNewsForm: FormGroup;
  validator: {} = {
    title: false,
    content: false,
    imgUrl: false
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<fromNews.State>,
    private httpClient: HttpClient
  ) {
    this.id = +this.activatedRoute.snapshot.params.id;
  }

  ngOnInit() {
    if (!this.id) {
      this.createForm({});
    } else {
      this.store.pipe(select(fromNews.news.items)).subscribe(items => {
        const item = items.find(x => x.id === this.id);
        this.createForm(
          item
            ? {
              title: item.title,
              content: item.content,
              imgUrl: item.imgUrl
            }
            : {}
        );
      });
    }
  }

  updateStore() {
    this.store.dispatch(new GetNewsList());
    this.router.navigate(['news']);
  }

  addNews(news) {
    let user = 'user';
    const randNumber = Math.floor(Math.random() * 100 + 1);
    user += randNumber;
    const dbNews = {...news, userName: user};
    if (this.id) {
      this.httpClient.put('/news/' + this.id, dbNews).subscribe(data => {
        this.updateStore();
      });
    } else {
      this.httpClient.post('/news', dbNews).subscribe(data => {
        this.updateStore();
      });
    }
  }

  private createForm(initialData) {
    this.addNewsForm = new FormGroup({
      title: new FormControl(initialData.title, Validators.required),
      content: new FormControl(initialData.content, Validators.required),
      imgUrl: new FormControl(initialData.imgUrl, Validators.required)
    });
  }
}
