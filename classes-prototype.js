
// Array - An array in JavaScript is an ordered collection of values (called elements), where each value can be of any data type. Arrays are used to store lists of items and are indexed by numbers starting from 0.

// Ques1- Difference b/w class & constructor function?

// Here’s the difference between a class and a constructor function in JavaScript:

// Constructor Function:

// Is a regular function used to create objects.
// Uses the function keyword.
// Called with the new keyword to create instances.
// Methods are usually added to the prototype.

function Person2(name) {
    this.name = name;
}
Person2.prototype.greet = function() {
    return "Hello, " + this.name;
};
const p = new Person2("Vaishali");

//Introduced in ES6 as syntactic sugar for constructor functions and prototypes.
// Uses the class keyword.
// Methods are defined inside the class body and are automatically added to the prototype.
// Cannot be called without new.

class Person3 {
    constructor(name) {
        this.name = name;
    }
    greet() {
        return "Hello, " + this.name;
    }
}
const p1 = new Person3("Vaishali");

// Ques2- Are classes hoisted ?
// No , classes are not hoisted. This means you cannot use a class before it is declared in the code. If you try to instantiate or reference a class before its declaration, you will get a ReferenceError. 

// Ques3 - Difference between static and instance methods?
// 1. Instance methods are methods defined inside the class and are available on the instances (objects) created from the class. You call them on an object: obj.method().
//2. Static methods are defined with the static keyword and are called on the class itself, not on instances. They cannot be called on an object created from the class.

class Example {
    static staticMethod() {
        return "I am static";
    }
    instanceMethod() {
        return "I am instance";
    }
}

const ex = new Example();
ex.instanceMethod(); // "I am instance"
Example.staticMethod(); // "I am static"
ex.staticMethod(); // Error: ex.staticMethod is not a function

// Ques4 - What is super?
//In JavaScript, super is a keyword used inside classes that extends another class (subclasses).
// In a subclass constructor, super() is used to call the parent class’s constructor and must be called before using this.
// Inside methods, super.methodName() is used to call a method from the parent class.
// Example:

class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        return this.name + " makes a noise.";
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name); // calls Animal's constructor
    }
    speak() {
        return super.speak() + " Woof!";
    }
}

const d = new Dog("Buddy");
d.speak(); // "Buddy makes a noise. Woof!"

//Ques5 - How does inheritance work internally?
// In JavaScript, inheritance works internally through the prototype chain.

// When you use class Child extends Parent, JavaScript sets up the prototype of Child.prototype to be Parent.prototype. This means instances of Child inherit methods and properties from Parent.
// The super keyword allows the child class to call the parent’s constructor and methods.
// The __proto__ property of the child instance points to Child.prototype, and Child.prototype.__proto__ points to Parent.prototype.

//1. When you create an instance of a subclass, JavaScript first runs the parent class’s constructor (via super()), then the subclass’s constructor.
//2. If a method/property is not found on the instance, JavaScript looks up the prototype chain: instance → subclass prototype → parent prototype → Object.prototype.

class Parent {
    greet() { return "Hello from Parent"; }
}
class Child extends Parent {
    greet() { return super.greet() + " and Child"; }
}
const c = new Child();
c.greet(); // "Hello from Parent and Child"

// internally

console.log(Object.getPrototypeOf(c) === Child.prototype)
console.log(Object.getPrototypeOf(Child.prototype) === Parent.prototype)
console.log(Object.getPrototypeOf(Parent.prototype) === Object.prototype)

// Ques6 - what does new Keyword do behind the scene?
//The new keyword in JavaScript does the following behind the scenes:

// 1.Creates a new empty object: {}
// 2.Sets the prototype of the new object to the constructor’s prototype: obj.__proto__ = Constructor.prototype
// 3.Binds this inside the constructor to the new object.
// 4.Executes the constructor function with the given arguments.
// 5.If the constructor returns an object, that object is returned. Otherwise, the new object is returned.

//Example: 
function Person(name) {
    this.name = name;
}
const p2 = new Person("Vaishali");
// Steps:
// 1. const p2 = {};
// 2. p2.__proto__ = Person.prototype
// 3. Person.call(p2, "Vaishali")
// 4. If Person returns nothing, p is returned