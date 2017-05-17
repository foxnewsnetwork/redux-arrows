
export interface Return<A,B> {
  (a: A): MonadInstance<B>
}

/**
 * The static Monad interface. We have to separate this from
 * the instance variation because lol javascript
 *
 * We also have to append M to everything to avoid accidental
 * name collisons with native functions like `bind` and `return`
 */
export interface Monad<A,B> {
  /**
   * >>=
   */
  bindM(m: MonadInstance<A>, fn: Return<A,B>): MonadInstance<B>
  /**
   * >>
   */
  thruM(m1: MonadInstance<A>, m2: MonadInstance<B>): MonadInstance<B>
  /**
   * return is a keyword in javascript, so we append M
   */
  returnM(a: A): MonadInstance<B>
  /**
   * For completion reasons, we put this here, but I won't use it
   */
  failM(str: String): MonadInstance<A>
}

export interface MonadInstance<A> {
  bindM<B>(fn: Return<A,B>): MonadInstance<B>
  thruM<B>(m: MonadInstance<B>): MonadInstance<B>
}
