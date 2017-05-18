import ReduxArrow from './redux-arrow';

const enum CombinableType {
  reducer,
  arrow,
  unknown
}

function typeOf(x: any): CombinableType {
  if (ReduxArrow.isArrow(x)) {
    return CombinableType.arrow;
  }

  if (typeof x === 'function') {
    return CombinableType.reducer;
  }

  return CombinableType.unknown;
}

const NORMALIZERS_BY_TYPE: TypedNormalizers = {
  [CombinableType.reducer](reducer) {
    return ReduxArrow.arr(reducer)
  },
  [CombinableType.arrow](arrow) {
    return arrow
  },
  [CombinableType.unknown]() {
    return ReduxArrow.id
  }
}

interface ArrowMaker {
  (x: any): ReduxArrow
}

interface TypedNormalizers {
  [propName: number]: ArrowMaker
}

interface ArrowsHash {
  [propName: string]: ReduxArrow
}

interface UserInputHash {
  [propName: string]: any
}

export default function normalizeArrows(arrowsReducersHash: UserInputHash): ArrowsHash {
  const keys = Object.keys(arrowsReducersHash);
  const arrows = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const thing = arrowsReducersHash[key];

    arrows[key] = NORMALIZERS_BY_TYPE[typeOf(thing)](thing);
  }
  return arrows;
}
