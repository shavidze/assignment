import * as fromRoot from "../../../../reducers";
import * as fromNews from "./news.reducer";
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";

export interface NewsState {
  news: fromNews.State;
}

export interface State extends fromRoot.State {
  news: NewsState;
}

export const reducers: ActionReducerMap<NewsState> = {
  news: fromNews.reducer
};

export const getCoreModuleState = createFeatureSelector<NewsState>("news");

export const getNewsState = createSelector(
  getCoreModuleState,
  (state: NewsState) => state.news
);

export const news = {
  items: createSelector(
    getNewsState,
    (state: fromNews.State) => state.items
  )
};
