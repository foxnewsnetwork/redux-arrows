export type Action = any;
export type ReduxState = any;

export interface ActionState {
  action: Action;
  state: ReduxState;
}

export interface Reducer {
  (state: ReduxState, action: Action): ReduxState
}
