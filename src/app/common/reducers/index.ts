import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromAuth from '../../auth/reducers/auth.reducer';
import * as fromUser from '../../user/reducers/user.reducer';

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
  [fromUser.featureKey]: fromUser.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromAuth.featureKey]: fromAuth.reducer,
  [fromUser.featureKey]: fromUser.reducer,
};

/* Auth Reducers */
const selectAuthState = createFeatureSelector<State, fromAuth.State>(
  fromAuth.featureKey,
);
export const selectLoginIsLoading = createSelector(
  selectAuthState,
  (state) => state.loginLoading,
);
export const selectAccessToken = createSelector(
  selectAuthState,
  (state) => state.accessToken,
);
export const selectLoginErrorMessage = createSelector(
  selectAuthState,
  (state) => state.errorMessage,
);

/* User Reducers */
const selectUserState = createFeatureSelector<State, fromUser.State>(
  fromUser.featureKey,
);
export const selectUserIsLoading = createSelector(
  selectUserState,
  (state) => state.loading,
);
export const selectUserInfo = createSelector(
  selectUserState,
  (state) => state.user,
);
export const selectUserErrorMessage = createSelector(
  selectUserState,
  (state) => state.errorMessage,
);
