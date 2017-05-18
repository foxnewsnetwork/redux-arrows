import ReducerArrow from './reducer-arrow';
import normalizeArrows from './normalize-arrows';
import { isBlank } from './utils';

export function redArrow(...args) {
  const [...keys] = args.slice(0, -1)
  const [redFn] = args.slice(-1)

  return ReducerArrow.create(redFn, keys)
}

export function combineArrows(arrowsReducersHash) {
  const arrowsHash = normalizeArrows(arrowsReducersHash)

  return ReducerArrow.create((state, action) => {
    const keys = Object.keys(arrowsHash)
    const actionState = { state, action }
    const nextState = {}
    let hasChanged = false
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const arrow = arrowsHash[key]
      const {
        state: nextStateForKey,
        meta: { changedKeys }
      } = ReducerArrow.runKleisli(arrow, actionState)

      if (isBlank(nextStateForKey)) {
        throw 'undefined state error'
      }
      nextState[key] = nextStateForKey
      hasChanged = changedKeys.length > 0
    }
    return hasChanged ? nextState : state
  });
}
