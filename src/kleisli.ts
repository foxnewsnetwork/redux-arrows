import { Arrow, ArrowInstance } from './arrow';
import { MonadInstance } from './monad';
import { PureFunction } from './function';

export interface Kleisli extends Arrow {
  runKleisli<A, B, M extends MonadInstance<B>>(k: KleisliInstance<A, B, M>, a: A): M;

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
  appendPure<A, B, M extends MonadInstance<B>, C, MC extends MonadInstance<C>>(k: KleisliInstance<A, B, M>, fn: PureFunction<B, C>): KleisliInstance<B, C, MC>

  prependPure<A, B, M extends MonadInstance<B>, C, MC extends MonadInstance<C>>(fn: PureFunction<A, B>, k: KleisliInstance<B, C, MC>): KleisliInstance<A, B, M>
}

export interface KleisliInstance<A, B, MB extends MonadInstance<B>> extends ArrowInstance<A, B> {
  /**
   * Empty for the same reason arrow and monad instances are empty
   */
}
