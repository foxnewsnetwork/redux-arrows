
export interface Return<A, B> {
  (a: A): MonadInstance<B>
}

/**
 * The static Monad interface. We have to separate this from
 * the instance variation because lol javascript
 *
 * We also have to append M to everything to avoid accidental
 * name collisons with native functions like `bind` and `return`
 */
export interface Monad /* We want to constraint MonadInstance here, but we can't */ {
  /**
   * >>=
   */
  bindM<A, B>(m: MonadInstance<A>, fn: Return<A, B>): MonadInstance<B>
  /**
   * >>
   */
  thruM<A, B>(m1: MonadInstance<A>, m2: MonadInstance<B>): MonadInstance<B>
  /**
   * return is a keyword in javascript, so we append M
   */
  returnM<A>(a: A): MonadInstance<A>
  /**
   * For completion reasons, we put this here, but I won't use it
   */
  failM<A>(str: String): MonadInstance<A>
}

export interface MonadInstance<A> {
  /**
   * WTF?! an EMPTY interface? What's the point of this?
   *
   * Strictly speaking, anything can theoretically be
   * made a instance of a monad since it just has to
   * obey the interface rules setup by the Monad interface
   *
   * Therefore, it doesn't make sense for us to specify
   * interface methods on the monad instance because that's
   * up to implementation... but at the same time, we do
   * benefit from typing information.
   */
}
