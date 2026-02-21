// Currying in javascript

// Example f(a,b) into f(a)(b)
// Ques 1 - sum(2)(6)(1)

// function sum(a){
//     return function(b){
//         return function(c){
//             console.log(a+b+c)
//         }
//     }
// }

// sum(1)(2)(3);

// Ques 2 - evaluate("sum")(4)(2) =>  6
// evaluate("multiply")(4)(2) =>  8
// evaluate("divide")(4)(2) =>  2
// evaluate("subtract")(4)(2) =>  2

function evaluate(operation){
    return function(a){
        return function(b){
            if(operation === 'sum') return a+b;
            else if(operation === 'multiply') return a*b;
            else if(operation === 'divide') return a/b;
            else if(operation === 'subtract') return a-b;
        }
    }
}

// const sum1 = evaluate("sum");
// console.log(sum1(10)(20));
// const mul = evaluate("multiply")(4)(2); 
// console.log(mul);
// const divide = evaluate("divide")(4)(2);
// console.log(divide);
// const sub= evaluate("subtract")(4)(2);
// console.log(sub);

// Ques 3 - Infinite currying - add(1)(2)(3)....

function add(a){
    return function(b){
        if(b) return add(a+b);
        return a;
    }
}


// console.log(add(1)(2)(3)());
// console.log(add(1)(2)(3)(4)(5)(6)());

// DIfference between currying and partial application

// Currying transforms a function with multiple arguments into a sequence of functions, each taking a single argument.

function sum(a, b, c) { return a + b + c; }
// Curried:
function curriedSum(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        }
    }
}
curriedSum(1)(2)(3); // 6

// Partial application fixes a few arguments of a function and returns a new function that takes the remaining arguments.
function sum3(a, b, c) { return a + b + c; }
const partialSum = sum3.bind(null, 1, 2); // fixes a=1, b=2
partialSum(3); 


// Ques 4 - Manipulating DOM

function updateElementText(id){
    return function(content){
        document.querySelector("#"+id).textContent = content;
    }
}

const updateHeader = updateElementText("heading");
updateHeader("Hello Vaishali Mishra");

// Question 5 - curry Implemetation
function curry(func){
    return function curriedFunc(...args){
        if(args.length >= func.length){
            return func(...args);
        }else {
            return function(...next){
                return curriedFunc(...args, ...next);
            }
        }
    }
}

const summision = (a,b,c,d) => a+b+c+d;

// const totalSum = curry(summision);
// console.log(totalSum(1)(2)(2)(4));