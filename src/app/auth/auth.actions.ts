import { Action } from '@ngrx/store';

export const SET_AUTH = '[UI] Start Loading';
export const SET_UNAUTH = '[UI] Stop Loading';

export class SetAuth implements Action {
  readonly type = SET_AUTH;
}

export class SetUnauth implements Action {
  readonly type = SET_UNAUTH;
}

export type AuthActions = SetAuth | SetUnauth;
