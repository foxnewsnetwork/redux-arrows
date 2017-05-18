import { Tuple } from './utils';
import { Action, ReduxState } from './redux';

export type Keys = string[]
export const enum ReducerStatusCode {
  ok, unused
}

export interface ReducerMeta {
  changedKeys: Keys
  statusCode: ReducerStatusCode
}

export interface ActionState {
  action: Action;
  state: ReduxState;
}

export interface ReducerExt {
  (actionState: ActionState): Tuple<ReduxState, ReducerMeta>
}
