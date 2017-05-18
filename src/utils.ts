
export interface Hash {
  [propName: string]: any
}

/**
 * Similar to ember set, except copies instead of
 * mutates
 * @param obj
 * @param key
 * @param val
 */
export function set(obj: Hash, keyString: string, val: any): Hash {
  const keys = parseKeys(keyString);
  return setCore(keys, val, obj);
}

function setCore(keys: string[], val: any, obj?: Hash): Hash {
  const hash = obj || {};

  if (keys.length === 1) {
    const [key] = keys;
    return Object.assign({}, hash, { [key]: val });
  } else if (keys.length > 1) {
    const [key, ...tailKeys] = keys;
    return Object.assign({}, obj, {
      [key]: setCore(tailKeys, val, hash[key])
    })
  } else {
    return hash;
  }
}

export function parseKeys(keyStr: string): string[] {
  return keyStr.split('.');
}

export class Tuple<A, B> {
  static create(a, b) {
    return new Tuple(a, b);
  }
  first: A
  second: B
  constructor(first, second) {
    this.first = first;
    this.second = second;
  }
  get last(): B {
    return this.second;
  }
}

export function isBlank(x: any): boolean { return typeof x === 'undefined'; }
