/* jshint devel:true */
// console.log('\'Allo \'Allo!');
//
import {Hello, bob} from './allo';

let allo = new Hello('whirlledisz');
allo.do();


// explicit scoping
{

  // We're unpacking the array a.k.a. destructuring it.
  // But, we're also using the spread operator (...) to repack values into an array, labeled `c`
  let [a, b, ...c] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  console.log(`inside the let scope, a + b == ${a + b}`);

  // Look! It's an array of the rest of the values.
  console.log(`here\'s johnny: ${c}`);

}

// There's no `c` here!
// console.log(c);
// => Uncaught ReferenceError: c is not defined


// Similarly, we might have a function that uses rest params and then does something with them.
//
function jank(a, b, ...c) {

  // What happens here if we don't have a `b`?
  // If `b` is undefined, we're stuck with string concatenation.
  console.log(`sum of jank: ${a + b}`);

  // Look! It's an array of the rest of the values.
  console.log(`etc: ${c}`);
}

// This doesn't work
jank([1, 2, 3, 4, 5, 6, 7, 8, 9]);

// So, you have to spread them.
jank(...[1, 2, 3, 4, 5, 6, 7, 8, 9]);

// Or just pass in a bunch of vals
jank(1, 2, 3, 4, 5, 6, 7, 8, 9);

// One place you can use the spread operator is when you would normally
// use .apply with the arguments as an array.

// spread operator unpacks an array into a loose sequence of values.
// rest arguments take a loose sequence of vals and pack them into an array.

// Hmmm...will this work?
// Nope, won't compile
// function hay(...a, b) {
//   console.log(`ayeee: ${a}`);
//   console.log(`beeee: ${b}`);
// }
//
// hay(1, 2, 3, 4, 5, 6, 7, 8, 9);


{
  // Object destructuring works like this:
  // "look up the thing on left hand side of the colon and assign its value to the thing on the right hand side. "
  // If it does not exist (for example, there is no `r` val, you can provide a default.)
  let {a: x, r: b = 2} = { a: `hay`, x: `boo`};
  console.log(x);
  console.log(b);
}



// I wasn't aware of this syntax...
let fibonacci = {
  [Symbol.iterator]() {
    let pre = 0, cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { done: false, value: cur }
      }
    }
  }
}

for (var n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 1000)
    break;
  console.log(n);
}


console.log(typeof System);



// let boo pull out the values x, y, and z and return a function
// that accepts an arg and multiplies it by the sum of x, y, and z
let boo = ({x: ex = 100,
            y: wy = 200,
            z: ze = 300}) => (mult) => (mult * (ex + wy + ze));

console.log('trying boo');
console.log(boo({x: 40, y: 50})(0.3));
console.log('trying bob');
console.log(bob({x: 40, y: 50})(0.3));

