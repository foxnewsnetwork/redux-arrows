class ExtensibleFunction extends Function {
  constructor(f) {
    super(f);
    return Object.setPrototypeOf(f, ExtensibleFunction.constructor.prototype);
  }
}
