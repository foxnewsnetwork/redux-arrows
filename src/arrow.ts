interface Fn<A,B> {
  (a: A): B;
}

interface Tuple<A,B> {
  first(t: Tuple<A,B>): A;
  second(t: Tuple<A,B>): B;
}

/**
 * Read about arrows here:
 *
 * https://hackage.haskell.org/package/base-4.9.1.0/docs/Control-Arrow.html
 *
 * The gist of this is that arrows are wrappers that extends categories
 *
 * We have to split up Haskell's arrow module into the static interface
 * and the instance interface because typescript doesn't support static
 * interfaces because, at the end of the day, typescript's types were made
 * for meme languages like Java, and not master-race languages like haskell
 */
export interface Arrow<B, C> {
  /**
   * Basic Arrow Interface
   */
  arr(fn: Fn<B,C>): ArrowInstance<B, C>;
  first<D>(a: ArrowInstance<B, C>): ArrowInstance<Tuple<B, D>, Tuple<C, D>>;
  second<D>(a: ArrowInstance<B, C>): ArrowInstance<Tuple<D, B>, Tuple<D, C>>;
  split(a1: ArrowInstance<B, C>, a2: ArrowInstance<B, C>): ArrowInstance<Tuple<B, B>, Tuple<C, C>>;
  fanout(a1: ArrowInstance<B, C>, a2: ArrowInstance<B, C>): ArrowInstance<B, Tuple<C, C>>;

  /**
   * Category Interface
   * We have to put this here because typescript
   * doesn't support haskell-like typeclasses.
   *
   * Because we aren't haskell, we don't support
   * differentiating between >>> composition and (.)
   * composition. Nor do we implement <<< composition
   */
  id: ArrowInstance<B, C>;
  compose<D>(a1: ArrowInstance<B,C>, a2: ArrowInstance<C, D>): ArrowInstance<B,D>;
}

export interface ArrowInstance<B,C> {
  compose<D>(a: ArrowInstance<C,D>): ArrowInstance<B,D>;
  first<D>(): ArrowInstance<Tuple<B,D>, Tuple<C,D>>;
  second<D>(): ArrowInstance<Tuple<D,B>, Tuple<D,C>>;
  split(a: ArrowInstance<B,C>): ArrowInstance<Tuple<B, B>, Tuple<C,C>>;
  fanout(a: ArrowInstance<B,C>): ArrowInstance<B, Tuple<C,C>>;
}
