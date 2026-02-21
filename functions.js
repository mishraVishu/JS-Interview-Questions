// functions in javascript
// Q1 - What is Function declarations ?

// A function declaration in JavaScript is a way to define a named function using the function keyword. It is hoisted, meaning you can call the function before its definition in the code.

function greeto(name) {
    return "Hello, " + name + "!";
}

// Q2- What are function expressions ?

// A function expression in JavaScript is when you define a function and assign it to a variable or pass it as an argument. Function expressions are not hoisted, so you cannot call them before they are defined.

const greet2 = function(name) {
    return "Hello, " + name + "!";
};

//Q3 - What are first class functions ?

// First class functions in JavaScript means that functions are treated as first-class citizens. This means:

// Functions can be assigned to variables.
// Functions can be passed as arguments to other functions.
// Functions can be returned from other functions.
// Functions can be stored in data structures (like arrays, objects).

// Q4 

for(let i=0; i<5;i++){
    setTimeout(function(){
        //console.log(i);
    },i*1000)
}

// Q5 - Function Hoisting

// functionName(); // WorkAtTech
// console.log(x); // undefined

// function functionName(){
//     console.log(x); // undefined
//     console.log('WorkAtTech'); // function declarations are fully hoisted
//     var x = 5;
// }
// var x = 10;

// Q9 

// var x = 21;

// var fun = function(){
//     console.log(x); // undefined
//     var x = 20;
// };

// fun();

// Q10 

function square (num) { // received as params
    console.log(num*num);
}

square(5) // 5 is apassed as an argument

// Q11 - 

const fn = (a, x, y, ...numbers) => {
    console.log(x, y);
} 

fn(5, 6, 7, 8);

//Q12 - Difference between Functions and arrow functions

//1. Syntax

//Function:
function add1(a, b) { return a + b; }

//Arrow Function:
//const add = (a,b) => a+b;

//2. this Binding
//Function: Has its own this (dynamic, depends on how it’s called).
//Arrow Function: Does not have its own this; inherits from the surrounding (lexical) scope.

//3. arguments Object
//Function: Has its own arguments object.
//Arrow Function: Does not have its own arguments object.

//4. Constructor Usage
//Function: Can be used as a constructor with new.
//Arrow Function: Cannot be used as a constructor.

//5. Hoisting
//Function Declaration: Is hoisted.
//Arrow Function/Function Expression: Not hoisted.


