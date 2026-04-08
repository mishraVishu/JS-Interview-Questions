// * Object -
// * An object in JavaScript is a collection of key-value pairs, where keys are strings (or symbols)
// * and values can be any data type (including other objects, functions, arrays, etc.).
// * Objects are used to represent and group related data and functionality.

// * Example:
// const person = {
//     name: "Vaishali",
//     age: 25,
//     greet: function() {
//         return "Hello, " + this.name;
//     }
// };

// ? Ques 1 - What's the output?
const func = (function (a) {
    delete a;
    return a;
})(5);

// * delete only works on object properties, not function parameters — so a is still 5
console.log(func); // 5

// ? Ques 2 - How to add a property with spaces in the key name?

const user = {
    name: 'Roadside coder',
    age: 24,
    "like the video": true
};

// * Use bracket notation [] to access keys with spaces
console.log(user['like the video']); // true

// ? Ques 3 - How to use a variable as an object key?
const property = "First Name";
const name = 'Vaishali';

const user2 = {
    [property]: name  // * computed property — variable becomes the key
};

console.log(user2["First Name"], user2);

// ? Ques 4 - How to loop through an object?
const user3 = {
    name: "Roadside Coder",
    age: 24,
    isTotallyAwesome: true,
};

// * for...in loops over all enumerable keys of an object
for (let key in user3) {
    console.log(`${key}: ${user3[key]}`);
}

// ? Ques 5 - What's the output?
const obj = {
    a: "one",
    b: "two",
    a: "three"  // duplicate key
}

// * duplicate keys are allowed — last one wins
console.log(obj); // { a: "three", b: "two" }

// ? Ques 6 - Create a function multiplyByTwo(obj) that multiplies all numeric property values by 2.

let nums = {
    a: 100,
    b: 200,
    title: "My nums"
};

const multiplyByTwo = (nums) => {
    for (let num in nums) {
        if (typeof nums[num] === 'number') {
            nums[num] = nums[num] * 2;
        }
    }
    console.log(nums);
}

multiplyByTwo(nums); // { a: 200, b: 400, title: "My nums" }

// ? Ques 7 - What's the output?
const a = {};
const b = { key: "b" };
const cObj = { key: "c" };

a[b] = 123;
a[cObj] = 456;

// * JavaScript converts object keys to strings
// * both b and cObj become "[object Object]" — same key, so second overwrites first
console.log(a[b]); // 456

// ? Ques 8 - What is JSON.stringify and JSON.parse?

// * JSON.stringify — converts a JavaScript object into a JSON string
// * JSON.parse    — converts a JSON string back into a JavaScript object

const obj4 = { name: "Vaishali", age: 25 };
const str = JSON.stringify(obj4);  // '{"name":"Vaishali","age":25}'
const parsed = JSON.parse(str);    // { name: "Vaishali", age: 25 }

// * Use JSON.stringify to send data (e.g., to a server)
// * Use JSON.parse to read received JSON data
// * Also used to store/retrieve values in localStorage

// ? Ques 9 - What's the output?
console.log([...'Lydia']); // * spread on a string splits into individual characters
// ['L', 'y', 'd', 'i', 'a']

// ? Ques 10 - What's the output?
const user5 = { name: "Lydia", age: 21 };
const admin = { admin: true, ...user5 };

// * spread operator copies all properties of user5 into admin
console.log(admin); // { admin: true, name: "Lydia", age: 21 }

// ? Ques 11 - What's the output?
const settings = {
    username: "Piyush",
    level: 19,
    health: 90,
};

const data = JSON.stringify(settings, ["level", "health"]);

// * second argument to JSON.stringify is a replacer array
// * only keys listed in the array are included in the output
console.log(data); // {"level":19,"health":90}

// ? Ques 12 - What's the output?
const shape = {
    radius: 10,
    diameter() {
        return this.radius * 2;
    },
    perimeter: () => 2 * Math.PI * this.radius
};

// * diameter() is a regular function — this refers to shape
// * perimeter is an arrow function — this is lexically bound to outer scope (window/undefined), not shape
console.log(shape.diameter());  // 20
console.log(shape.perimeter()); // NaN

// ? Ques 13 - What is destructuring in objects?

let user6 = {
    name: "Vaishali",
    age: 24,
};

// * destructuring with renaming: name → userName, age → userAge
const { name: userName, age: userAge } = user6;

// ? Ques 14 - What's the output?
function getItems(fruitList, favoriteFruit, ...args) {
    return [...fruitList, favoriteFruit, ...args];
}

// * spreads fruitList, adds favoriteFruit, then spreads remaining args
console.log(getItems(["banana", "apple"], "pear", "orange", "Kiwi", "Pineapple"));
// ["banana", "apple", "pear", "orange", "Kiwi", "Pineapple"]

// ? Ques 15 - (Imp) What's the output?
let cGreeting = { greeting: "Hey!" };
let d;

d = cGreeting; // * d and cGreeting point to the same object in memory

cGreeting.greeting = "Hello";
console.log(d.greeting); // * "Hello" — same reference, so d reflects the change

// ? Ques 16 - What's the output?
console.log({ a: 1 } == { a: 1 });  // false
// console.log({ a: 1 } === { a: 1 }); // false
// * objects are compared by reference, not value — two separate objects are never equal

// ? Ques 17 - What's the output?
let person = { name: "Lydia" };
const members = [person];
person = null; // * person variable now points to null, but members[0] still holds the original reference

console.log(members); // [ { name: 'Lydia' } ]

// ? Ques 18 - What's the output?
const value = { number: 10 };

const multiply = (x = { ...value }) => {
    console.log((x.number *= 2));
}

// * default param creates a fresh shallow copy each time — so value.number stays 10
multiply();       // 20
multiply();       // 20
// * passing value directly — mutates value.number in place
multiply(value);  // 20 (10 * 2)
multiply(value);  // 40 (20 * 2, value.number was mutated above)

// ? Ques 19 - What's the output?
function changeAgeAndReference(person) {
    person.age = 25;       // * mutates the original object via reference
    person = {             // * reassigns local variable only, original reference unchanged
        name: 'John',
        age: 50
    };
    return person;
}

const personObj1 = {
    name: "Alex",
    age: 30
}

console.log(changeAgeAndReference(personObj1)); // { name: 'John', age: 50 }
console.log(personObj1);                        // { name: 'Alex', age: 25 }

// ? Ques 20 - What is shallow copy and deep copy?

// * Shallow copy — copies only top-level properties
// * nested objects are still shared by reference — changes affect both copies

const obj1 = { a: 1, b: { c: 2 } };
const shallow = { ...obj1 };
shallow.b.c = 3;
console.log(obj1.b.c); // 3 — original affected ❌

// * Deep copy — copies all levels, completely independent
const deep = JSON.parse(JSON.stringify(obj1));
deep.b.c = 4;
console.log(obj1.b.c); // 3 — original not affected ✅

// ? Ques 21 - How to clone an object?
let user7 = {
    name: 'Roadside Coder',
    age: 24
};

// * Object.assign — shallow clone
// const objClone = Object.assign({}, user7);

// * JSON.parse/stringify — deep clone (simple values only)
const objClone = JSON.parse(JSON.stringify(user7));
console.log(objClone);

// ? Ques 22 - What are the ways to deep clone an object?

// * 1. JSON.parse(JSON.stringify()) — simplest
const obj22 = { a: 1, b: { c: 2 } };
const clone1 = JSON.parse(JSON.stringify(obj22));
clone1.b.c = 99;
console.log(obj22.b.c); // 2 ✅
// ! ❌ Fails with: undefined, functions, Symbol, Date, NaN, circular refs

// * 2. structuredClone() — modern & recommended
const obj23 = { a: 1, b: { c: 2 }, d: new Date() };
const clone2 = structuredClone(obj23);
clone2.b.c = 99;
console.log(obj23.b.c); // 2 ✅
// * ✅ Handles Date, Map, Set, circular refs
// ! ❌ Fails with: functions, Symbol

// * 3. Recursive custom function — full control
function deepClone(obj) {
    // * base case: primitives (string, number, boolean, null, undefined) — return as is
    if (obj === null || typeof obj !== 'object') return obj;

    // * if it's an array, clone each element recursively
    if (Array.isArray(obj)) {
        const arrClone = [];
        for (let i = 0; i < obj.length; i++) {
            arrClone[i] = deepClone(obj[i]);
        }
        return arrClone;
    }

    // * if it's an object, clone each key-value pair recursively
    const objClone = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            objClone[key] = deepClone(obj[key]);
        }
    }
    return objClone;
}

const obj24 = { a: 1, b: { c: 2 } };
const clone3 = deepClone(obj24);
clone3.b.c = 99;
console.log(obj24.b.c); // 2 ✅
// ! ❌ Need to handle edge cases yourself (Date, Map, circular refs etc.)

// * 4. Lodash _.cloneDeep() — library
// const _ = require('lodash');
// const clone4 = _.cloneDeep(obj24);
// * ✅ Handles almost everything
// ! ❌ Requires external dependency

// * Comparison:
// * | Method               | Functions | Date | Circular refs | Built-in |
// * |----------------------|-----------|------|---------------|----------|
// * | JSON.parse/stringify |     ❌    |  ❌  |      ❌       |    ✅    |
// * | structuredClone      |     ❌    |  ✅  |      ✅       |    ✅    |
// * | Custom recursive     |    ⚠️     |  ⚠️  |      ⚠️       |    ✅    |
// * | Lodash cloneDeep     |     ✅    |  ✅  |      ✅       |    ❌    |
// * For most cases — use structuredClone()

// ============================================================
// ? Object Built-in Methods
// ============================================================

const sample = { name: "Vaishali", age: 25, city: "Delhi" };

// ? 1. Object.keys() — returns array of keys
console.log(Object.keys(sample)); // ["name", "age", "city"]

// ? 2. Object.values() — returns array of values
console.log(Object.values(sample)); // ["Vaishali", 25, "Delhi"]

// ? 3. Object.entries() — returns array of [key, value] pairs
console.log(Object.entries(sample)); // [["name","Vaishali"], ["age",25], ["city","Delhi"]]

// ? 4. Object.assign() — copies properties from source to target (shallow)
const target = { a: 1 };
const source = { b: 2, c: 3 };
const result = Object.assign(target, source);
console.log(result); // { a: 1, b: 2, c: 3 }
// ! Note: target itself is mutated

// ? 5. Object.freeze() — makes object immutable (no add/update/delete)
const frozen = Object.freeze({ x: 10 });
frozen.x = 99;  // silently fails
frozen.y = 100; // silently fails
console.log(frozen); // { x: 10 } — unchanged

// ? 6. Object.seal() — prevents add/delete but allows update
const sealed = Object.seal({ x: 10 });
sealed.x = 99;   // ✅ allowed
sealed.y = 100;  // ❌ silently fails
delete sealed.x; // ❌ silently fails
console.log(sealed); // { x: 99 }

// * freeze vs seal:
// * freeze → no add, no update, no delete
// * seal   → no add, no delete, BUT update is allowed

// ? 7. Object.create() — creates object with specified prototype
const proto = {
    greet() {
        return `Hi, I am ${this.name}`;
    }
};
const newObj = Object.create(proto);
newObj.name = "Vaishali";
console.log(newObj.greet()); // "Hi, I am Vaishali"

// ? 8. Object.hasOwn() — checks if property is own (not inherited)
const obj25 = { a: 1 };
console.log(Object.hasOwn(obj25, 'a'));         // true
console.log(Object.hasOwn(obj25, 'toString'));  // false (inherited from prototype)

// ? 9. Object.fromEntries() — converts array of [key, value] pairs to object
const entries = [["name", "Vaishali"], ["age", 25]];
console.log(Object.fromEntries(entries)); // { name: "Vaishali", age: 25 }
// * useful with Map too:
const map = new Map([["a", 1], ["b", 2]]);
console.log(Object.fromEntries(map)); // { a: 1, b: 2 }

// ? 10. Object.isFrozen() / Object.isSealed()
const frozenObj = Object.freeze({ a: 1 });
console.log(Object.isFrozen(frozenObj)); // true
console.log(Object.isSealed(frozenObj)); // true — frozen objects are also sealed

const sealedObj = Object.seal({ a: 1 });
console.log(Object.isSealed(sealedObj)); // true
console.log(Object.isFrozen(sealedObj)); // false

// ? 11. Object.defineProperty() — define/modify a property with fine control
const person25 = {};
Object.defineProperty(person25, 'name', {
    value: "Vaishali",
    writable: false,    // * cannot be changed
    enumerable: true,   // * shows up in loops
    configurable: false // * cannot be deleted or redefined
});
console.log(person25.name); // "Vaishali"
person25.name = "John";     // silently fails (writable: false)
console.log(person25.name); // "Vaishali"
