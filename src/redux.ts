export type Action = any;
export type ReduxState = any;

export interface Reducer {
  (state: ReduxState, action: Action): ReduxState
}

