import { Kleisli, KleisliInstance } from './kleisli';
import { ActionState, ReduxState } from './redux';
import { MonadInstance } from './monad'

class DepKeyState implements MonadInstance<ReduxState> {
  reduxState: ReduxState
  changedKeys: string[]

  constructor(reduxState, changedKeys=[]) {
    this.reduxState = reduxState;
    this.changedKeys = changedKeys
  }

  bindM(fn) {
    const { reduxState, changedKeys } = fn(this.reduxState);
    return new DepKeyState(reduxState, changedKeys);
  }
  thruM(fn) {
    return fn(this.reduxState);
  }
}



interface Transformer {
  (ks: KeyState): KeyState
}

interface Updater {
  (s: ReduxState, k: KeyState): ReduxState
}

function objectAssign(reduxState, keyState) {
  return Object.keys(keyState).reduce((state, key) => Object.assign({}, ), reduxState);
}

class ReducerArrow implements KleisliInstance<ActionState, ReduxState, DepKeyState> {
  readingKeys: string[]
  writingKeys: string[]
  transformer: Transformer
  updater: Updater
  constructor(transformer, updater=objectAssign, readingKeys=[], writingKeys=[]) {

  }
  runKleisli(actionState) {

  }
  appendPure() {

  }
  prependPure() {

  }
}
