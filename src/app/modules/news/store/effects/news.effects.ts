import {map, mergeMap} from 'rxjs/operators';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {GetNewsList, GetNewsListSuccess, NewsActionTypes} from '../actions/news.actions';
import {NewsService} from '../../shared/news.service';

@Injectable()
export class NewsEffects {
  @Effect()
  getNewsList$: Observable<Action> = this.actions$.pipe(
    ofType<GetNewsList>(NewsActionTypes.GetNewsList),
    mergeMap((action: GetNewsList) => {
      return this.newsService.getNewsList().pipe(
          map(items => {
            return new GetNewsListSuccess({data: items});
          })
        );
      }
    )
  );


  constructor(
    private actions$: Actions,
    private newsService: NewsService
  ) {
  }
}
