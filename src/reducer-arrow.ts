type Action = any;
type State = any;
interface ActionState {
  action: Action;
  state: State;
}
class ReducerArrow extends ExtensibleFunction {

}
class StaticReducerArrow implements Arrow<ActionState, State> {

}
