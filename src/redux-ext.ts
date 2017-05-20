import { Monad } from './monad';
import { Action, ReduxState } from './redux';

export type Keys = string[]
export const enum ReducerStatusCode {
  ok, // the reducer was called and has transformed the changedKeys of its state
  all, // the reducer was called and has transformed all keys of its state
  unused, // the reducer was called but it doesn't respond to the given action
  failed // the reducer has errored
}

export interface ReducerMeta {
  changedKeys: Keys
  statusCode: ReducerStatusCode
}

export interface ActionState {
  action: Action
  state: ReduxState
}

const NULL_META: ReducerMeta = {
  changedKeys: [],
  statusCode: ReducerStatusCode.unused
};

const FAIL_META: ReducerMeta = {
  changedKeys: [],
  statusCode: ReducerStatusCode.failed
};

const NULL_REDUCER: ReducerExt = ({ state }) => ({ state, meta: NULL_META });
const FAIL_REDUCER: ReducerExt = ({ state }) => ({ state, meta: FAIL_META });

export const ResultStateM: Monad /* We want to constrain ResultStateFn here, but can't */ = {
  bindM(r: ResultStateFn, fn: ReducerExt): ResultStateFn {
    return (action) => {
      const { state } = r(action)
      return fn({ state, action })
    }
  },
  thruM(r: ResultStateFn, r2: ResultStateFn): ResultStateFn {
    return r2;
  },
  returnM(state: ReduxState): ResultStateFn {
    return (action) => NULL_REDUCER({ state, action })
  },
  failM(str: string): ResultStateFn {
    return (action) => FAIL_REDUCER({ state: str, action })
  }
}

export function makeResultState(state: ReduxState, meta: ReducerMeta): ResultState {
  return { state, meta };
}

export interface ResultState {
  state: ReduxState
  meta: ReducerMeta
}

export interface ResultStateFn {
  (action: Action): ResultState
}

export interface ReducerExt {
  (actionState: ActionState): ResultState
}
