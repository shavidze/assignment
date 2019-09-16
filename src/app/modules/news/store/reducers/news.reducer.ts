import {NewsModel} from '../../shared/news.model';
import {NewsActionsUnion, NewsActionTypes} from '../actions/news.actions';

export interface State {
  items: Array<NewsModel>;
}

export const initialState: State = {
  items: [],
};

export function reducer(
  state: State,
  action: NewsActionsUnion
): State {
  state = Object.assign({}, initialState, state);
  switch (action.type) {
    case NewsActionTypes.GetNewsListSuccess:
      const data = action.payload.data;
      return {
        ...state,
        items: data
      };
    default: {
      return state;
    }
  }
}
