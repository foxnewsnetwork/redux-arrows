class ExtensibleFunction extends Function {
  constructor(f) {
    return Object.setPrototypeOf(f, ExtensibleFunction.constructor.prototype);
  }
}

class ReadingFunction extends ExtensibleFunction {
  constructor(fn, depKeys=[]) {
    super(fn);
    this.depKeys = depKeys;
  }
}

export function reads(...args) {
  const depKeys = args.slice(0, -1);
  const fn = args[args.length - 1];

  return new ReadingFunction(depKeys, fn);
}
