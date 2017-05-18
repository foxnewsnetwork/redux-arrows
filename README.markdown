# Redux Arrows - WIP
Generalize redux reducers into haskell arrows

## Why?
Ever thought about combining the cleaniness of DDAU redux state management with the fine-tuned observable control of MobX (or, if you're in ember-land, computed-properties)? Now you can!

By declaring metadata on your reducers, you can now subscribe to just changes in the redux store you're interested in. No change to your underlaying data-structure, reopening Object prototype, or any other junk necessary.

## Usage
Decorate your reducers with metadata regarding what state it reads and what state it updates like so:

(without decorators)
```javascript
import Actions from './actions';
import ReduxArrows from 'redux-arrows';

const Reducers = {
  [Actions.SOME_TYPE]: ReduxArrows.redArrow('someProp', (state, action) => {
      /* write your reducer here */
  }),
  [Actions.ANOTHER_TYPE]: ReduxArrows.redArrow('someProp', 'anotherProp', (state, action) => {
      /* write your reducer here */
  }).
  [Actions.THIRD_TYPE]: (state, action) => {
    // regular reducer
  }
}

const arrowReducer = ReduxArrows.combineArrows(Reducers);

const { state, meta } = ReduxArrows.runKleisli(arrowReducer, { state: myState, action: someAction });
```
Here, state is the next state as traditionally manufactured by a reducer.

Meta is an object that contains the following:
```javascript
meta = {
  changedKeys: ['someProp']
}
```
That is, in addition to giving you the state, we also give you what portions of the state changed with respect to the previous state. We do this so you can subscribe to only the stuff you're interested in on the store.

```javascript
store.subscribe('activePost', myCallback);
```

This, in turn, unifies the MobX / Ember `computed` pattern of data management with redux's functional paradigm... and we get there by being even more declarative in redux

## API
