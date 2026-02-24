// Object - 

// An object in JavaScript is a collection of key-value pairs, where keys are strings (or symbols) and values can be any data type (including other objects, functions, arrays, etc.).Objects are used to represent and group related data and functionality.

//Example:

// const person = {
//     name: "Vaishali",
//     age: 25,
//     greet: function() {
//         return "Hello, " + this.name;
//     }
// };

// Ques 1 - 
const func = (function (a) {
    delete a;
    return a;
})(5);

console.log(func);

// Ques 2 - How to add like the video prop with spaces?

const user = {
    name: 'Roadside coder',
    age: 24,
    "like the video": true
};

console.log(user['like the video']); // true

// Ques 3 - 
const property = "First Name";
const name = 'Vaishali';

const user2 = {
    [property]: name
};

console.log(user2["First Name"], user2) // use [] to access property value as key

// Ques 4 - Loop through Objects
const user3 = {
    name: "Roadside Coder",
    age: 24,
    isTotallyAwesome: true,
};

for (let key in user3) {
    console.log(`${key}: ${user3[key]}`);
}

//Ques 5 - What's the output?

const obj = {
    a: "one",
    b: "two",
    a: "three"
}

console.log(obj); //const obj = {
//     a: "three",
//     b: "two",
// }

// Ques 6 - Create a function multiplyByTwo(obj) that multiplies all numeric property values of nums by 2.

let nums = {
    a: 100,
    b: 200,
    title: "My nums"
};

const multiplyByTwo = (nums) => {
    for (let num in nums) {
        if (typeof nums[num] === 'number') {
            num: nums[num] * 2;
        }
    }
    console.log(nums);
}

multiplyByTwo(nums);

//Ques 7 - What's the o/p of the following code ?

const a = {};
const b = { key: "b" };
const cObj = { key: "c" };

a[b] = 123;
a[cObj] = 456;

//JavaScript converts the object to a string. Both b and cObj are converted to "[object Object]", so:
//a[b] = 123; sets a["[object Object]"] = 123
//a[cObj] = 456; then sets a["[object Object]"] = 456, overwriting the previous value
console.log(a[b]); // 456

// Ques 8 - What is JSON.stringify and JSON.parse ?

// JSON.stringify converts a JavaScript object or value into a JSON string.
// JSON.parse converts a JSON string back into a JavaScript object.

// Example: 
const obj4 = { name: "Vaishali", age: 25 };
const str = JSON.stringify(obj4); // '{"name":"Vaishali","age":25}'
const parsed = JSON.parse(str); // { name: "Vaishali", age: 25 }

//Usage: 
// Use JSON.stringify to send data (e.g., to a server).
// Use JSON.parse to read data received as JSON.
// used to store values in localStorage;

// Ques 9 - What's the output?

console.log([...'Lydia']) // ['L', 'y', 'd','i','a']

// Ques 10- What's the output

const user5 = { name: "Lydia", age: 21 };
const admin = { admin: true, ...user5 };

console.log(admin); // {admin:true, name: "Lydia", age: 21} 

// Ques 11 - What's the output ?

const settings = {
    username: "Piyush",
    level: 19,
    health: 90,
};

const data = JSON.stringify(settings, ["level", "health"]);

//The output is {"level":19,"health":90} because the second argument to JSON.stringify is a "replacer" array.
// The replacer array tells JSON.stringify which keys to include in the output.
// Only level and health are included, so username is omitted.
console.log(data); // {"level":19,"health":90}

//Ques 12 - What's the output ?

const shape = {
    radius: 10,
    diameter() {
        return this.radius * 2;
    },
    perimeter: () => 2 * Math.PI * this.radius
};

console.log(shape.diameter()); // 20
console.log(shape.perimeter()); // NaN

// Ques 13 - What is desturcturing in objects?

let user6 = {
    name: "Vaishali",
    age: 24,
};

const { name: userName, age: userAge } = user6;

// Ques 14 - What's the output?

function getItems(fruitList, favoriteFruit, ...args) {
    return [...fruitList, favoriteFruit, ...args]
}

console.log(getItems(["banana", "apple"], "pear", "orange", "Kiwi", "Pineapple"));

// Ques 15 - (Imp) What's the output

let cGreeting = { greeting: "Hey!" };
let d;

d = cGreeting;

cGreeting.greeting = "Hello";
console.log(d.greeting); // Hello

// Ques 16 - What's the output?

console.log({ a: 1 } == { a: 1 }); //false (both are different object having different m/m locations);
// console.log({ a: 1 } === { a: 1 }); // false

// Ques 17 - What's the output?

let person = { name: "Lydia"};
const members = [person];
person = null;

console.log(members); // [ 0 : {name: 'Lydia'}];

// Ques 18 - What's the output ?

const value = { number: 10 };

const multiply = (x = {...value }) => {
    console.log((x.number *=2));
}

multiply(); // 20
multiply(); // 20
multiply(value); // 20
multiply(value); // 40

// Ques 19 - What's the output

function changeAgeAndReference(person){
    person.age = 25;
    person = {
        name: 'John',
        age: 50
    };

    return person;
}

const personObj1 = {
    name: "Alex",
    age: 30
}

console.log(changeAgeAndReference(personObj1)) // {name:'John', age: 50}
console.log(personObj1) // {name:'Alex', age: 25}

// Ques 20 - What is shallow copy and Dep copy ?

//A shallow copy copies only the top-level properties of an object or array. If those properties are themselves objects, only their references are copied—not their actual values. Changes to nested objects affect both the original and the copy.

// A deep copy copies all levels of an object or array, including nested objects. The copy is completely independent; changes to nested objects in the copy do not affect the original.

const obj1 = { a: 1, b: { c: 2 } };
const shallow = { ...obj1 };
shallow.b.c = 3;
console.log(obj1.b.c); // 3

const deep = JSON.parse(JSON.stringify(obj1));
deep.b.c = 4;
console.log(obj1.b.c); // 2

// Ques 21 - How to deep clone/ clone an object?

let user7 = {
    name: 'Roadside Coder',
    age: 24
};

//const objClone = Object.assign({},user7);
const objClone = JSON.parse(JSON.stringify(user7));

console.log(objClone); 
