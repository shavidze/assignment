import {Action} from '@ngrx/store';

export enum NewsActionTypes {
  GetNewsList = '[News] Get News List',
  GetNewsListSuccess = '[News] Get News List Success'
}

export class GetNewsList implements Action {
  readonly type = NewsActionTypes.GetNewsList;

  constructor() {
  }
}

export class GetNewsListSuccess implements Action {
  readonly type = NewsActionTypes.GetNewsListSuccess;

  constructor(public payload: any) {
  }
}

export type NewsActionsUnion =
  | GetNewsList
  | GetNewsListSuccess;
