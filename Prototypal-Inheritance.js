// Inheritance - When an object can access properties and methods from another object is known as Inheritance.
// Prototype Chain - The chain Where objects look their parent's protytype to find methods and properties is known as Prorotype chain.

// Inheritance with Object.create - creates new object with prototype set to existing object.

let obj = {
    name: "Vaishali",
    age:27
}

console.log(obj.__proto__);

let num = 10;
console.log(num.__proto__.__proto__) // it has underlying prototype of Object so its proved that everything in js is object.

// 1.All objects, arrays, and functions are objects.
// 2.Even primitives (like numbers, strings, booleans) have object-like behavior because JavaScript automatically wraps them with their respective object wrappers (Number, String, Boolean) when you access properties or methods.
// 3.All values (except null and undefined) have a prototype chain that eventually links to Object.prototype.

console.log(num.__proto__ === Number.prototype); // true
console.log(num.__proto__.__proto__ === Object.prototype); // true
console.log(num.toString()); // works because of Number.prototype

let arr = [];
console.log(arr.__proto__ === Array.prototype); // true
console.log(arr.__proto__.__proto__ === Object.prototype); // true

// So, everything in JS (except null and undefined) is either an object or inherits from Object.prototype, which is why we say "everything in JS is an object.

//Prototype Inheritance

//Defining a constructor function
function Animal(name){
    this.name = name;
}

// Add a method to the prototype
Animal.prototype.sayName = function (params){
    console.log(`My name is ${this.name}. My breed is ${this.breed}.`)
}

//creating instance of Animal 
let animal = new Animal('Olive');
animal.sayName();

//Creating Dog function having prototype of Animal
function Dog(name,breed){
    Animal.call(this,name);
    this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function(){
    console.log('Woof!');
}

const dog1 = new Dog("Olive", "Labra");
dog1.sayName();
dog1.bark();

// -------------- Interview Questions on Prototypes --------------------

//Ques 1 - What will be the output for the following code ?

function vehicle(){}

vehicle.prototype.drive = function(){
    console.log('Driving a vehicle');
}

function Car(){};
Car.prototype = Object.create(vehicle.prototype);
Car.prototype.constructor = Car;
Car.prototype.drive = function(){
    console.log("driving a car");
}

let vehicle1 = new vehicle();
let car = new Car();

vehicle1.drive(); //Driving a vehicle
car.drive(); // driving a car

//Ques 2 - Explain the difference between __proto__ and prototype

//prototype is used to define properties and methods to be inherited by instances.
//__proto__ is the actual reference on an object to its prototype.

// In short:
// prototype → property on constructor function (used for inheritance)
// __proto__ → property on instance/object (points to its prototype)

// Ques 3- What is setPrototypeOf()?

let animalPrototype = {
    sound: function(){
        console.log('Making a sound...');
    },
};

// creating an object with animalPrototype as its prptotype
let dog2 = Object.create(animalPrototype);

// creating another object woth different prototype
let cat = {
    purr: function(){
        console.log("Purring...")
    }
};

Object.setPrototypeOf(dog2,cat);

// Ques 4 - How can you create an object without a prototype in javascript?
let objt = Object.create(null);
console.log('obj1',objt);

//Ques 5 - What is the output of the following code ?
function A(){}
A.prototype.foo = 10;

function B(){}
B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;
B.prototype.foo = 20;

function C(){}
C.prototype = Object.create(B.prototype);
C.prototype.constructor = C;
C.prototype.foo = 30;

let obj1 = new A();
let obj2 = new B();
let obj3 = new C();

console.log(obj1.foo);
console.log(obj2.foo);
console.log(obj3.foo);

//Ques 6 - Deep clone an object in js
let obj4 = {
    a:1,
    b:{
        c:2,
        d:[3,4]
    },
};

// let clonedObj = obj4;
// clonedObj.a = 3; // it will change value in both clonedObj as well as in obj4;

function deepClone (obj){
    if(obj === null || typeof obj !== "object"){
        return obj;
    }

    if(Array.isArray(obj)){
        return obj.map(item => deepClone(item));
    }

    let clone = {};

    // Iterate through each key in the input object
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            clone[key] = deepClone(obj[key]);
        }
    }

    return clone;
}

let cloned = deepClone(obj4);
cloned.b.c = 20;
console.log(cloned, obj4);

// Another way - structuredClone(obj4);


