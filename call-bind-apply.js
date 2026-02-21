// call,bind,apply (Explicit Binding)

// Question 1 - what is call ?
// The call method in javascript is used to invoke function with a specified this value and arguments provided individually.

var obj = { name: 'Vaishali' };

function sayHello(age, profession) {
    return 'Hello ' + this.name + ' is ' + age + 'and is' + profession;
}

console.log(sayHello(28));
console.log(sayHello.call(obj, 28, 'Engineer'))

// Question 2. What is apply ?
// The apply method in JavaScript is used to invoke a function with a specified this value, and arguments provided as an array (or array-like object).

console.log(sayHello.apply(obj, [28, 'Engineer']));

// Question 3. What is bind ?
// The bind method in JavaScript creates a new function that, when called, has its this value set to the provided value, with a given sequence of arguments pre-set (if any).

const boundHello = sayHello.bind(obj, 28, 'Engineer');
console.log(boundHello());

// Question 4. 

const age = 10;

var person = {
    name: 'Piyush',
    age: 20,
    getAge: function () {
        return this.age;
    }
}

var person2 = {
    age: 24
}

console.log(person.getAge.call(person2)); // 24

// Question 5

var status = "😎";

setTimeout(() => {
    const status = "😍";

    const data = {
        status: "🥑",
        getStatus: function () {
            return this.status;
        },
    };

    console.log(data.getStatus()); // 🥑
    console.log(data.getStatus.call(this)); // 😎
}, 0);

//Question 6 - Print all animals from Animals Array

const animals = [
    { species: 'Lion', name: 'King' },
    { species: 'Whale', name: 'Queen' },
];

function printAnimals(i) {
    this.print = function () {
        console.log("#" + i + " " + this.species + ": " + this.name)
    }
    this.print();
}

for (let i = 0; i < animals.length; i++) {
    printAnimals.call(animals[i], i);
}

// Question 7 : Append an arry to another array

const array = ['a', 'b'];
const elements = [0, 1, 2];

array.push.apply(array,elements);
console.log(array);

//Question 8 - Using apply to enhance built-in functions

// find min/max number in an array
const numbers = [5,6,2,3,7];

console.log(Math.max.apply(null,numbers));
console.log(Math.min.apply(null,numbers));

// Question 9 : Bound Function

// function f(){
//     console.log(this);
// }

// user = {
//     g: f.bind(null),
// };

// user.g(); // window object

//Question 10 - Bind Chaining

function fn2(){
    console.log(this.name);
}

// Only the first bind works. The second bind does nothing.
// fn = fn.bind({name: 'john'}).bind({name:'Ann'})
// fn(); // Output: john , bind chaininh doesn't exist , if we have bind fnwith some context it will be bound to that only.

// Question 11 - Fix the Line 137 to make code work properly

function checkPassword(success, failed) {
    let password = prompt("Password?", "");
    if(password === "Vaishali") success();
    else failed();
}

// Remove any previous declaration of newUser to avoid redeclaration errors
// Use let to allow reassignment if needed
// let newUser = {
//     name: "Preeti",
//     loginSuccessful: function(){
//         console.log(`${this.name} logged in`);
//     },
//     loginFailed: function(){
//         console.log(`${this.name} failed to log in`);
//     }
// };

// // Fix: Bind the methods to newUser so 'this' refers to newUser
// checkPassword(newUser.loginSuccessful.bind(newUser), newUser.loginFailed.bind(newUser));

// Question 12 - Partial application for login function

// Question 13 - Explicit Binding with arrow function

const age2 = 10;

var person2 = {
    name: "Vaishali",
    age: 20,
    getAgeArrow: () => console.log(this.age),
    getAge: function(){
        console.log(this.age);
    }
}

var person3 = {age: 24};

person2.getAgeArrow.call(person3);// undefined
person2.getAge.call(person3); // 24

// Question 14 - Polyfill for Call Method

let car1 = {
    color: "Red",
    company: 'Ferrari'
};

function purchaseCar(currency, price){
    console.log(`I have purchased ${this.color} - ${this.company} car for my husband.Worth ${currency}${price}`);
}

//purchaseCar.call(car1, '₹', 5000000);

Function.prototype.myCall = function(context={},...args){
    if(typeof this !== 'function'){
        throw new Error(`${this} is not a function.`);
    }
    context.fn = this;
    context.fn(...args);
}

purchaseCar.myCall(car1,`₹`,5000000 );

// Polyfill for apply

Function.prototype.myApply = function(context={},args=[]){
    if(typeof this !== 'function'){
        throw new Error(`${this} is not a function.`);
    }
    if(!Array.isArray(args)){
        throw new Error(`${args} must be an array`)
    }
    context.fn = this;
    context.fn(...args);
}

purchaseCar.myApply(car1,['₹',5000000]);

// polyfill for Bind Method

Function.prototype.myBind = function(context={},...args){
    if(typeof this !== 'function'){
        throw new Error(`${this} is not a function`);
    }
    context.fn = this;
    return function(...newArgs){
        context.fn(...args,...newArgs);
    };

}

const newFn = purchaseCar.myBind(car1,'₹',5000000);
newFn();
//console.log(newFn('₹',5000000));
