import { Arrow, ArrowInstance } from './arrow';
import { MonadInstance } from './monad';
import { PureFunction } from './function';

export interface Kleisli<A, B, M extends MonadInstance<B> > extends Arrow<A,B> {
  runKleisli(k: KleisliInstance<A, B, M>, a: A): M;

  /**
   * Equivalent to ^>> from haskell
   * This lifts a pure function to an arrow
   * then appends it to an arrow. For example:
   *
   * arrow >>^ pureFun
   *
   * would be equivalent to
   *
   * appendPure(arrow, pureFun)
   *
   * Of course, because we aren't haskell, we can infix operators.
   *
   * Furthermore, we'd like to constraing the MonadInstance, but we
   * can't because no haskell typeclass... so just don't switch
   * monads mid-way through and we should be fine (lol)
   */
  appendPure<C, MC extends MonadInstance<C>>(k: KleisliInstance<A, B, M>, fn: PureFunction<B, C>): KleisliInstance<B, C, MC>

  prependPure<C, MC extends MonadInstance<C>>(fn: PureFunction<A, B>, k: KleisliInstance<B, C, MC>): KleisliInstance<A, B, M>
}

export interface KleisliInstance<A, B, MB extends MonadInstance<B>> extends ArrowInstance<A,B> {
  runKleisli(a: A): MB;
  appendPure<C, MC extends MonadInstance<C>>(fn: PureFunction<B, C>): KleisliInstance<B, C, MC>
  prependPure<Z>(fn: PureFunction<Z, A>): KleisliInstance<Z, B, MB>
}
