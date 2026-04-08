//Ques 1 - Guss the o/p

let count = 0;
(function printCount() {
    if (count === 0) {
        let count = 1; // shadowing
        //console.log(count); // 1
    }
    //console.log(count) //0
})();

//Ques 2 - Write a function that would allow you to do this

function createBase(base){
    return function(num){
        return num + base;
    }
}

var addSix = createBase(6);
console.log(addSix(10)) // returns 16
console.log(addSix(21)) // returns 27

//Ques 3 - Time optimization
// Closures can help in time optimization by allowing you to cache or remember expensive computations,
// so you don't have to repeat them every time a function is called.
// In the find example below, the array a is rebuilt on every call, which is inefficient.

function find(index) {
    let a = [];
    for (let i = 0; i < 1000000; i++) {
        a[i] = i * i;
    }
    // console.log(a[index]);
}

//console.time("6");
find(6);
//console.timeEnd("6");

//console.time("12");
find(12);
//console.timeEnd("12");

function optimizedFind() {
    let a = [];
    for (let i = 0; i < 1000000; i++) {
        a[i] = i * i;
    }
    return function (index) {
         //console.log(a[index]);
    }
}

const find2 = optimizedFind();

//console.time("6");
find2(6);
//console.timeEnd("6");

//console.time("12");
find2(12);
//console.timeEnd("12");

// Ques 4 - Block Scope and setTimeout
// What will this print? How do you fix it to print 0, 1, 2?

function a() {
    for (var i = 0; i < 3; i++) {
        setTimeout(() => {
            //console.log(i); // 3 3 3
        }, 1000)
    }
};
a();

// Fix 1: use let (block scoped)
for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        //console.log(i); // 0 1 2
    }, 1000)
}

// Fix 2: use inner function to capture i
function b() {
    for (var i = 0; i < 3; i++) {
        function inner(i) {
            setTimeout(() => {
                //console.log(i); // 0 1 2
            }, 1000)
        }
        inner(i);
    }
}
b();

// Fix 3: use IIFE to capture i
function c() {
    for (var i = 0; i < 3; i++) {
        (function (j) {
            setTimeout(() => {
                //console.log(j); // 0 1 2
            }, 1000)
        })(i);
    }
}
c();

// Ques - 5 How would you use closure to create a private counter?

function counter() {
    let count = 0;
    return {
        increment() {
            return count += 1;
        },
        decrement() {
            return count -= 1;
        },
        reset() {
            return count = 0;
        }
    }
}

const counter2 = counter();
// console.log(counter2.increment());
// console.log(counter2.increment());
// console.log(counter2.increment());
// console.log(counter2.decrement());
// console.log(counter2.reset());

// Ques - 6 What is Module Pattern?

// Module Pattern is a design pattern in JavaScript which is used to create private and public variables
// and methods. It uses closures to keep certain data private and exposing only what you want as a
// public API. Refer to the counter example above.

// This pattern helps prevent global namespace pollution and keeps internal details hidden from outside code.

// Ques - 7 Make this run only once

let view;
let called = false;
function likeTheVideo() {
    if (!called) {
        view = 'RoadsideCoder';
        //console.log("Subscribe to", view);
        called = true;
    }
}

likeTheVideo();
likeTheVideo();
likeTheVideo();

// Ques - 8 Once Polyfill
// Implement the once() function

function once(fn, context) {
    let ran;

    return function () {
        if (fn) {
            ran = fn.apply(context || this, arguments);
            fn = null;
        }
        return ran;
    }
}

const hello = once((a, b) => { console.log('Hello World', a, b) });

hello(1, 2);
hello(1, 2);
hello(1, 2);
hello(1, 2);

// Ques - 9 Memoize Polyfill
// Implement the myMemoized() function
function myMemoized(fn, context, maxSize = 100) {
    if (typeof fn !== 'function') throw new TypeError('myMemoized: first argument must be a function');

    let res = new Map();

    function serialize(args) {
        return args.map(arg => {
            if (typeof arg === 'function') return `__fn__${arg.toString()}`;
            if (typeof arg === 'symbol') return `__sym__${arg.toString()}`;
            if (Number.isNaN(arg)) return '__NaN__';
            if (arg === Infinity) return '__Infinity__';
            if (arg === -Infinity) return '__-Infinity__';
            return JSON.stringify(arg); // handles null, objects, arrays etc.
        }).join('|');
    }

    return function (...args) {
        const cachedArgs = serialize(args);
        if (res.has(cachedArgs)) {
            return res.get(cachedArgs);
        }
        const result = fn.apply(context || this, args);
        // evict oldest entry if cache exceeds maxSize
        if (res.size >= maxSize) {
            res.delete(res.keys().next().value);
        }
        res.set(cachedArgs, result);
        return result;
    }
}

const clumsySquare = myMemoized((num1, num2) => {
    for (let i = 0; i < 10000000; i++) {}
    return num1 * num2;
});

// console.time("firstCall")
// console.log(clumsySquare(9467, 9756));
// console.timeEnd("firstCall");

// console.time("SecondCall")
// console.log(clumsySquare(9467, 9756));
// console.timeEnd("SecondCall");

// Ques - 10 Difference between closure and scope?

// Scope is about variable accessibility (where a variable can be used).
// Closure is when a function "remembers" and can access variables from its outer scope,
// even after that scope has closed.
