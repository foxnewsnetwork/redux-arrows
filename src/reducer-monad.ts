import {
  ActionState,
  ReducerExt,
  Keys,
  makeResultState,
  ReducerStatusCode,
  ReducerMeta
} from './redux-ext';
import { Monad } from './monad';
import { Reducer } from './redux';

const ReducerMonad: Monad = {

}

interface ObservingReducer {
  reducerExt: ReducerExt
  changingKeys: Keys
}

function makeOkMeta(changedKeys: Keys): ReducerMeta {
  return { changedKeys, statusCode: ReducerStatusCode.ok };
}

class ObservingReducerM implements ObservingReducer {
  reducer: Reducer
  changingKeys: Keys

  constructor(fn: Reducer, keys: Keys) {
    this.reducer = fn;
    this.changingKeys = keys
  }

  get reducerExt(): ReducerExt {
    return ({ action, state }) => makeResultState(this.reducer(state, action), makeOkMeta(this.changingKeys))
  }
}
