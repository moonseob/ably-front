import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from '../auth/reducers/auth.reducer';

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State | undefined, action: any): any => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();
    return result;
  };
}

export interface State {
  [fromAuth.featureKey]: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromAuth.featureKey]: fromAuth.reducer,
};

/* Auth Reducers */
export const getAuthState = createFeatureSelector<State, fromAuth.State>(
  fromAuth.featureKey,
);
export const getLoginIsLoading = createSelector(
  getAuthState,
  (state) => state.loginLoading,
);
export const getAccessToken = createSelector(
  getAuthState,
  (state) => state.accessToken,
);
export const getLoginErrorMessage = createSelector(
  getAuthState,
  (state) => state.errorMessage,
);
