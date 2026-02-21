//Ques 1 - Guss the o/p

let count = 0;
(function printCount() {
    if (count === 0) {
        let count = 1; // shadowing
        // console.log(count); //1
    }
    // console.log(count) //0
})();

//Ques 2 - Write a function that would allow you to do this

function createBase(num) {
    return function (args) {
        return num + args;
    }
}

var addSix = createBase(6);
//console.log(addSix(10)) //returns 16
//console.log(addSix(21)) // returns 27

//Ques 3 -  Time optimization
// Closures can help in time optimization by allowing you to cache or remember expensive computations, so you don’t have to repeat them every time a function is called. In your find example, the array a is rebuilt on every call, which is inefficient.

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
        // console.log(a[index]);
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
function a() {
    for (var i = 0; i < 3; i++) {
        setTimeout(() => {
            //console.log(i); // 3 3 3
        }, 1000)
    }
};
a();

for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        //console.log(i); // 0,1,2
    }, 1000)
}

function b() {
    for (var i = 0; i < 3; i++) {
        function inner(i) {
            setTimeout(() => {
                //console.log(i); //
            }, 1000)
        }
        inner(i);
    }
}
b()

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

// Ques - 6 What is Module Pattern ?

// Module Pattern is a design pattern in javascript  which is used to create private and public variables and methods. It uses closures for keep certain data private and exposing only what you wamt as a public API. Refer counter example .

// This pattern helps prevent global namespace pollution and keeps internal details hidden fropm outside code.

// Ques - 7 Make this run only once 

let view;
let called = false;
function likeTheVideo() {
    if (!called) {
        view = 'RoadsideCoder';
        //console.log("Subscribe to", view);
        called = true
    }
}


likeTheVideo();
likeTheVideo();
likeTheVideo();

// Ques -8 Once Polyfill

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

hello(1, 2)
hello(1, 2);
hello(1, 2);
hello(1, 2);

// Ques - 9 Memoize Polyfill 

function myMemoized(fn, context){
    let res = new Map();
    return function(...arguments){
        let cachedArgs = JSON.stringify(arguments);
        if(res.has(cachedArgs)){
            // console.log(res.get(cachedArgs));
            return res.get(cachedArgs);
        }else{
            let result = fn.apply(context || this, arguments);
            res.set(cachedArgs,result);
            return result;
        }
    }
}

const clumsySquare = myMemoized((num1, num2) => {
    for (let i = 0; i < 10000000; i++) {}
     return num1 * num2
});

// console.time("firstCall")
// // console.log(clumsySquare(9467, 9756));
// console.timeEnd("firstCall");

// console.time("SecondCall")
// // console.log(clumsySquare(9467, 9756));
// console.timeEnd("SecondCall");

// Ques- 10 Difference between closure and scope ?

//Scope is about variable accessibility (where a variable can be used).
//Closure is when a function “remembers” and can access variables from its outer scope, even after that scope has closed.