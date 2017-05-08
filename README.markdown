# Redux Arrows - WIP
Generalize redux reducers into haskell arrows

## Why?
Ever thought about combining the cleaniness of DDAU redux state management with the fine-tuned observable control of MobX (or, if you're in ember-land, computed-properties)? Now you can!

By declaring metadata on your reducers, you can now subscribe to just changes in the redux store you're interested in. No change to your underlaying data-structure, reopening Object prototype, or any other junk necessary.

## Usage
Decorate your reducers with metadata regarding what state it reads and what state it updates like so:

```javascript
const Reducers = {
  @reads('posts.post', 'activeUser')
  @writes('activePost')
  myReducer(state, action) {
      /* write your reducer here */
  }
}
```

Then, subscribe to just the stuff that changes later on:

```javascript
this.store.subscribe('activePost', myCallback);
```

