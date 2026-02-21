// Explain this keyword

// The 'this' keyword in JavaScript refers to the object that is executing the current function.
// Its value depends on how a function is called:

console.log(this); // refers to global Object i.e window object , in browsers and in node env undefined.

a = 5;
function Param (){
    console.log(this.a); // - 5  this refers to global object i.e window object inside regular function
}
Param();

const greet = () => {
    console.log(this.a) // - 5 Arrow functions don't have their own this.  here this is lexically bound . They get the value of this from their lexical scope where they are defined not from calling object.
}
greet(); 

let user = {
    name:'Piyush',
    age: 24,
    getDetails(){
        console.log(this.name); // Piyush , In normal function this refers to the object calling that method.
    }
}
user.getDetails();

let user2 = {
    name:'Piyush',
    age: 24,
    childObj: {
        names: "Vaishali",
        getDetails(){
            console.log(this.names, this.name); // Vaishali ,undefined In normal function this refers to the immediate parent object.
        }
    }
}
user2.childObj.getDetails(); 

let user3 = {
    name:'Piyush',
    age: 24,
    getDetails: () =>{
        console.log(this.name); // undefined or prints nothing
    }
}
user3.getDetails(); // prints nothing, Arrow functions do not have their own this; they inherit this from their lexical (surrounding) scope.getDetails () do not have any normal function as its parent to its pointing to global object where this.anme is undefined.

class user4{
    constructor(n){
        this.name = n;
    }

    getName(){
        console.log(this.name); // here this refers to the newly created instance of class user4.
    }
}

const newUser = new user4("Vaishali Mishra");
newUser.getName();


// Ques 1 - What is the output?

const user5 ={
    firstName: "Vaishali",
    getName() {
        const firstName = "Vaishali!";
        console.log(this.firstName); // Vaishali, Regular function so this refers ti its immediate parent i.e object;
    }
}
user5.getName();

//Ques 2 - What is the result of accessing its ref  and Why?

function makeUser () {
    return {
        name:'John',
        ref: this
    }
}

let user6 = makeUser();
console.log(user6);
console.log(user6.ref) // here user is the object with name and ref prop where ref is this pointing to global object , which do not have name prop on it so it will print nothing.

// Solution to fix this
function makeUser () {
    return {
        name:'John',
        ref(){
            return this;
        } 
    }
}

let user7 = makeUser();
console.log(user7.ref());
console.log(user7.ref().name);

// Ques 3 - What is the output

const user8 = {
    name: "Vaishali Mishra",
    logMessage(){
        console.log(this.name);
    }
}

setTimeout(() => user.logMessage,1000) // print nothing or nothing because  the function logMessage is passed as a callback and loses its association with the user8 object. As a result, inside logMessage, this refers to the global object (or undefined in strict mode), not to user8.

//solution 
setTimeout(() => user8.logMessage.call(user8),1000);

// Ques - 4 What is the output

const user9 = {
    name:'Vaishali',
    greet() {
        return `Hello ${this.name}`
    },
    farewell: () => {
        return `Goodbye, ${this.name}`
    },
}

console.log(user9.greet()); // Hello Vaishali 
console.log(user9.farewell());// Goodbye undefined

// Ques 5 - Create an object calculator

// let calculator = {
//     read(){
//         this.a = prompt("a =",0);
//         this.b = prompt("b =",0);
//     },
//     sum(){
//         return Number(this.a) + Number(this.b);
//     },
//     mul(){
//         return this.a * this.b;
//     }
// }

// calculator.read();
// console.log(calculator.sum());
// console.log(calculator.mul());

//Ques 6 - What will be the output

var length = 4;
function callback(){
    console.log(this.length);
}

const object1 = {
    length: 5,
    method(fn){
        fn();
    }
}
object1.method(callback); // 4 When you call object.method(callback);, inside method, you call fn(); (which is callback()). In this case, callback is invoked as a regular function, not as a method of any object. Therefore, this inside callback refers to the global object (window in browsers

const object = {
    length: 5,
    method(){ //[callback,1,2]
        arguments[0](); // callback() which is array  so its parent is arraywhich is object so it will rerturn length of args array
    }
}
object.method(callback,1,2);

// Ques 7 - Implement calc

function calc() {
    let res = 0;
    return {
        add(n) {
            res += n;
            return this;
        },
        subtract(n) {
            res -= n;
            return this;
        },
        multiply(n) {
            res *= n;
            return this;
        },
        total() {
            return res;
        }
    };
}

const result = calc().add(10).multiply(5).subtract(30).add(10);
console.log(result.total());

