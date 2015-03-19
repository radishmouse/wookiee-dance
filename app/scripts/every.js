// The default value of this module is a function expression.
// It accepts two arguments: an integer and a function expression.
// The default values are 2000 and null
//
// Note that the value `undefined` would normally be assigned if the argument was ommitted.
// This is because regular params cannot come after default params in the function definition.
export default (howOften=2000, fn=null) => {
  'use strict';

  // Let `doThing` be a function expression that returns the result of calling `setTimeout`
  // The first argument to `setTimeout` is a callback function.
  let doThing = () => setTimeout(() => {
    // Inside the callback to `setTimeout`, call the function expression `fn`
    // and then recur via requestAnimationFrame if the function expression is not null.

    if (fn && typeof fn === 'function') {
      fn();
      window.requestAnimationFrame(doThing);
    }
  }, howOften);

  // Start the recursion by calling `doThing` once.
  doThing();
};
