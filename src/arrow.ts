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
 */
interface Arrow<B, C> {
  /**
   * Basic Arrow Interface
   */
  arr(fn: Fn<B,C>): Arrow<B, C>;
  first<D>(a: Arrow<B, C>): Arrow<Tuple<B, D>, Tuple<C, D>>;
  second<D>(a: Arrow<B, C>): Arrow<Tuple<D, B>, Tuple<D, C>>;
  split(a1: Arrow<B, C>, a2: Arrow<B, C>): Arrow<Tuple<B, B>, Tuple<C, C>>;
  fanout(a1: Arrow<B, C>, a2: Arrow<B, C>): Arrow<B, Tuple<C, C>>;

  /**
   * Category Interface
   * We have to put this here because typescript
   * doesn't support haskell-like typeclasses.
   *
   * Because we aren't haskell, we don't support
   * differentiating between >>> composition and (.)
   * composition. Nor do we implement <<< composition
   */
  id: Arrow<B, C>;
  compose<D>(a1: Arrow<B,C>, a2: Arrow<C, D>): Arrow<B,D>;
}

