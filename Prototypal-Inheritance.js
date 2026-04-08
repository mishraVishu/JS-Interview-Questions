// ============================================================
// PROTOTYPAL INHERITANCE IN JAVASCRIPT — Senior Dev Reference
// ============================================================
// Inheritance: when an object can access properties/methods
// from another object via the prototype chain.
// Prototype Chain: the lookup chain JS walks when a property
// is not found on the object itself.


// ============================================================
// SECTION 1: EVERYTHING IS AN OBJECT (prototype chain root)
// ============================================================

console.log('--- Prototype Chain Root ---');

let obj = { name: 'Vaishali', age: 27 };
console.log(obj.__proto__ === Object.prototype); // true

// Primitives auto-wrap to their object counterparts
let num = 10;
console.log(num.__proto__ === Number.prototype);          // true
console.log(num.__proto__.__proto__ === Object.prototype); // true
console.log(num.toString());  // works via Number.prototype

let arr = [];
console.log(arr.__proto__ === Array.prototype);           // true
console.log(arr.__proto__.__proto__ === Object.prototype); // true

// Key rules:
// 1. All objects/arrays/functions are objects.
// 2. Primitives (number, string, boolean) auto-wrap when you access properties.
// 3. All values (except null and undefined) eventually link to Object.prototype.
// 4. Object.prototype.__proto__ === null  ← end of chain


// ============================================================
// SECTION 2: prototype vs __proto__
// ============================================================

console.log('\n--- prototype vs __proto__ ---');

// prototype   → property on a CONSTRUCTOR FUNCTION
//               used to define what instances inherit
// __proto__   → property on an INSTANCE / OBJECT
//               points to the prototype it was created from

function Person(name) {
    this.name = name;
}
Person.prototype.greet = function() {
    console.log(`Hi, I'm ${this.name}`);
};

const p = new Person('Vaishali');
console.log(p.__proto__ === Person.prototype);    // true
console.log(Person.prototype.constructor === Person); // true

// Modern alternative to __proto__ (spec-approved):
console.log(Object.getPrototypeOf(p) === Person.prototype); // true


// ============================================================
// SECTION 3: CONSTRUCTOR FUNCTION INHERITANCE
// ============================================================

console.log('\n--- Constructor Function Inheritance ---');

function Animal(name) {
    this.name = name;
}
Animal.prototype.sayName = function() {
    console.log(`My name is ${this.name}.`);
};

function Dog(name, breed) {
    Animal.call(this, name);  // borrow constructor — sets this.name
    this.breed = breed;
}

// Wire up prototype chain: Dog → Animal → Object
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;  // restore constructor reference (lost after reassignment)
Dog.prototype.sayName = function(){
    Animal.prototype.sayName.call(this);
    console.log(`My breed is ${this.breed}.`)
}
Dog.prototype.bark = function() {
    console.log('Woof!');
};

const dog1 = new Dog('Olive', 'Labra');
dog1.sayName();  // My name is Olive. My breed is Labra.
dog1.bark();     // Woof!

console.log(dog1 instanceof Dog);    // true
console.log(dog1 instanceof Animal); // true — chain works


// ============================================================
// SECTION 4: Object.create() — explicit prototype setting
// ============================================================

console.log('\n--- Object.create ---');

const animalProto = {
    speak() {
        console.log(`${this.name} makes a sound.`);
    }
};

const cat = Object.create(animalProto);
cat.name = 'Whiskers';
cat.speak(); // Whiskers makes a sound.

console.log(Object.getPrototypeOf(cat) === animalProto); // true

// Create object with NO prototype — pure dictionary, no inherited keys
const dict = Object.create(null);
dict.key = 'value';
console.log('no prototype:', dict);
// Useful for: safe hash maps — no risk of __proto__, toString, hasOwnProperty pollution


// ============================================================
// SECTION 5: Object.setPrototypeOf() — dynamic prototype swap
// ============================================================

console.log('\n--- Object.setPrototypeOf ---');

const swimmer = { swim() { console.log('swimming...'); } };
const runner  = { run()  { console.log('running...');  } };

const duck = Object.create(swimmer);
duck.swim(); // swimming...

//const duck = Object.assign({},swimmer,runner);
Object.setPrototypeOf(duck, runner); // swap prototype at runtime
duck.run();  // running...
//duck.swim();
// duck.swim() — would now throw, swim is no longer in the chain

// WARNING: setPrototypeOf is slow — JS engines optimize based on
// fixed prototype chains. Use Object.create() at creation time instead.


// ============================================================
// SECTION 6: hasOwnProperty vs 'in' operator
// ============================================================

console.log('\n--- hasOwnProperty vs in ---');

function Vehicle(type) {
    this.type = type;
}
Vehicle.prototype.drive = function() { console.log('driving'); };

const car = new Vehicle('sedan');

console.log('type' in car);              // true  — own property
console.log('drive' in car);             // true  — inherited property
console.log(car.hasOwnProperty('type')); // true  — own
console.log(car.hasOwnProperty('drive')); // false — inherited, NOT own

// Modern: Object.hasOwn(car, 'drive') — same as hasOwnProperty but safer
console.log(Object.hasOwn(car, 'type'));  // true


// ============================================================
// SECTION 7: for...in loop and prototype chain
// ============================================================

console.log('\n--- for...in and prototype ---');

function Base() { this.own = 'I am own'; }
Base.prototype.inherited = 'I am inherited';

const instance = new Base();

// for...in iterates OWN + INHERITED enumerable properties
for (let key in instance) {
    console.log(key); // own, inherited
}

// Guard with hasOwnProperty to skip inherited
for (let key in instance) {
    if (Object.hasOwn(instance, key)) {
        console.log('own only:', key); // own
    }
}

// Object.keys — only own enumerable (preferred over for...in for objects)
console.log(Object.keys(instance)); // ['own']


// ============================================================
// SECTION 8: PROPERTY SHADOWING
// ============================================================

console.log('\n--- Property Shadowing ---');

function Shape(color) {
    this.color = color;
}
Shape.prototype.color = 'default'; // prototype property

const circle = new Shape('red');
console.log(circle.color);          // 'red'  — own property SHADOWS prototype
delete circle.color;
console.log(circle.color);          // 'default' — falls back to prototype


// ============================================================
// SECTION 9: DEEP CLONE (interview classic)
// ============================================================

console.log('\n--- Deep Clone ---');

const original = { a: 1, b: { c: 2, d: [3, 4] } };

// Approach 1: recursive manual clone
// Uses WeakMap to track visited objects — handles circular references
// Uses getOwnPropertySymbols — handles Symbol keys
function deepClone(obj, visited = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') return obj;

    // circular reference check — return already-cloned version
    if (visited.has(obj)) return visited.get(obj);

    const clone = Array.isArray(obj) ? [] : {};

    // register BEFORE recursing so circular refs resolve to this clone
    visited.set(obj, clone);

    // handle string + Symbol keys
    const keys = [
        ...Object.keys(obj),                  // string keys
        ...Object.getOwnPropertySymbols(obj),  // Symbol keys
    ];

    for (const key of keys) {
        clone[key] = deepClone(obj[key], visited);
    }

    return clone;
}

const cloned = deepClone(original);
cloned.b.c = 99;
console.log('original.b.c:', original.b.c); // 2 — untouched ✓

// Approach 2: structuredClone (modern, handles Date/Map/Set/circular refs)
const cloned2 = structuredClone(original);
console.log('structuredClone:', cloned2);

// Approach 3: JSON trick (loses functions, undefined, Date, circular refs)
const cloned3 = JSON.parse(JSON.stringify(original));
console.log('JSON clone:', cloned3);


// ============================================================
// SECTION 10: INTERVIEW QUESTIONS
// ============================================================

console.log('\n\n=== INTERVIEW QUESTIONS ===\n');

// ─────────────────────────────────────────────
// Q1: What is the output?
// ─────────────────────────────────────────────
console.log('Q1: Method override / shadowing');

function Vehicle2() {}
Vehicle2.prototype.drive = function() { console.log('Driving a vehicle'); };

function Car() {}
Car.prototype = Object.create(Vehicle2.prototype);
Car.prototype.constructor = Car;
Car.prototype.drive = function() { console.log('Driving a car'); };

const v = new Vehicle2();
const c = new Car();
v.drive(); // Driving a vehicle
c.drive(); // Driving a car — Car.prototype.drive SHADOWS Vehicle2.prototype.drive


// ─────────────────────────────────────────────
// Q2: prototype vs __proto__
// ─────────────────────────────────────────────
console.log('\nQ2: prototype vs __proto__');
// prototype   → on constructor function → blueprint for instances
// __proto__   → on instance            → actual link to its prototype
// Object.getPrototypeOf(x) is the spec-approved way to read __proto__

function Foo() {}
const foo = new Foo();
console.log(foo.__proto__ === Foo.prototype);               // true
console.log(Object.getPrototypeOf(foo) === Foo.prototype);  // true
console.log(Foo.prototype.constructor === Foo);             // true


// ─────────────────────────────────────────────
// Q3: What is Object.create(null) used for?
// ─────────────────────────────────────────────
console.log('\nQ3: Object.create(null)');
// Creates a true empty object — no prototype chain at all.
// Safe as a dictionary: no risk of key collisions with Object.prototype
// methods like 'toString', 'constructor', 'hasOwnProperty'.

const safeMap = Object.create(null);
safeMap['toString'] = 'custom'; // safe — no prototype pollution
console.log(Object.getPrototypeOf(safeMap)); // null


// ─────────────────────────────────────────────
// Q4: What is the output? (prototype chain lookup)
// ─────────────────────────────────────────────
console.log('\nQ4: Prototype chain foo lookup');

function A() {}
A.prototype.foo = 10;

function B() {}
B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;
B.prototype.foo = 20;

function C() {}
C.prototype = Object.create(B.prototype);
C.prototype.constructor = C;
C.prototype.foo = 30;

console.log(new A().foo); // 10 — A.prototype.foo
console.log(new B().foo); // 20 — B.prototype.foo shadows A
console.log(new C().foo); // 30 — C.prototype.foo shadows B


// ─────────────────────────────────────────────
// Q5: What happens if you forget to reset the constructor?
// ─────────────────────────────────────────────
console.log('\nQ5: Missing constructor reset');

function Parent() {}
function Child() {}
Child.prototype = Object.create(Parent.prototype);
// forgot: Child.prototype.constructor = Child;

const ch = new Child();
console.log(ch.constructor === Parent); // true  ← WRONG, points to Parent
console.log(ch.constructor === Child);  // false ← broken

Child.prototype.constructor = Child;   // fix it
console.log(ch.constructor === Child);  // true  ✓


// ─────────────────────────────────────────────
// Q6: instanceof — how does it work?
// ─────────────────────────────────────────────
console.log('\nQ6: instanceof internals');

// instanceof walks the __proto__ chain of the left-hand side
// looking for the prototype of the right-hand side constructor.

function Alpha() {}
function Beta() {}
Beta.prototype = Object.create(Alpha.prototype);
Beta.prototype.constructor = Beta;

const b = new Beta();
console.log(b instanceof Beta);   // true  — Beta.prototype in chain
console.log(b instanceof Alpha);  // true  — Alpha.prototype in chain
console.log(b instanceof Object); // true  — Object.prototype in chain

// Manual implementation of instanceof:
function myInstanceOf(obj, Constructor) {
    let proto = Object.getPrototypeOf(obj);
    while(proto !== null){
        if(proto === Constructor.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}
console.log(myInstanceOf(b, Alpha)); // true


// ─────────────────────────────────────────────
// Q7: Object.create vs new — what's the difference?
// ─────────────────────────────────────────────
console.log('\nQ7: Object.create vs new');

function MyClass(val) { this.val = val; }
MyClass.prototype.show = function() { console.log(this.val); };

// new: runs constructor, sets __proto__, returns the new object
const via_new = new MyClass(42);

// Object.create: sets __proto__, does NOT run constructor
const via_create = Object.create(MyClass.prototype);
// via_create.val is undefined — constructor never ran

console.log(via_new.val);    // 42
console.log(via_create.val); // undefined
via_create.show();           // undefined — but method works via chain


// ─────────────────────────────────────────────
// Q8: What does 'new' do internally?
// ─────────────────────────────────────────────
console.log('\nQ8: Implement new from scratch');

function myNew(Constructor, ...args) {
    // 1. Create empty object with prototype linked to Constructor.prototype
    const obj = Object.create(Constructor.prototype);
    // 2. Call constructor with the new object as 'this'
    const result = Constructor.call(obj, ...args);
    // 3. Return the object (unless constructor explicitly returns an object)
    return result instanceof Object ? result : obj;
}

function Point(x, y) { this.x = x; this.y = y; }
Point.prototype.toString = function() { return `(${this.x}, ${this.y})`; };

const pt = myNew(Point, 3, 4);
console.log(pt.toString());          // (3, 4)
console.log(pt instanceof Point);    // true


// ─────────────────────────────────────────────
// Q9: Mixin pattern — multiple inheritance in JS
// ─────────────────────────────────────────────
console.log('\nQ9: Mixins');

// JS has single prototype chain — mixins simulate multiple inheritance
const Serializable = {
    serialize() { return JSON.stringify(this); }
};
const Validatable = {
    validate() { return Object.keys(this).length > 0; }
};

function User(name, email) {
    this.name  = name;
    this.email = email;
}
// Copy mixin methods onto prototype
Object.assign(User.prototype, Serializable, Validatable);

const user = new User('Vaishali', 'v@example.com');
console.log(user.serialize());  // {"name":"Vaishali","email":"v@example.com"}
console.log(user.validate());   // true


// ============================================================
// SECTION 11: PROPERTY DESCRIPTORS
// ============================================================

console.log('\n--- Property Descriptors ---');

// Every property has a descriptor with 3 flags:
// writable     — can the value be changed?
// enumerable   — does it show in for...in / Object.keys?
// configurable — can the descriptor itself be changed or property deleted?

const config = {};
Object.defineProperty(config, 'API_KEY', {
    value: 'abc-123',
    writable: false,     // read-only
    enumerable: false,   // hidden from Object.keys / for...in
    configurable: false, // cannot be deleted or redefined
});

config.API_KEY = 'hacked'; // silently fails (throws in strict mode)
console.log(config.API_KEY);        // 'abc-123' — unchanged
console.log(Object.keys(config));   // []  — not enumerable, hidden

// Object.keys     → own enumerable properties only
// Object.getOwnPropertyNames → own enumerable + non-enumerable
// for...in        → own + inherited enumerable

function Demo() { this.x = 1; }
Demo.prototype.y = 2;
const d = new Demo();

console.log('Object.keys:', Object.keys(d));                    // ['x']
console.log('getOwnPropertyNames:', Object.getOwnPropertyNames(d)); // ['x']
// for...in would give: x, y  (includes inherited)

// Check a descriptor
console.log(Object.getOwnPropertyDescriptor(config, 'API_KEY'));
// { value: 'abc-123', writable: false, enumerable: false, configurable: false }


// ============================================================
// SECTION 12: GETTERS AND SETTERS IN PROTOTYPE CHAIN
// ============================================================

console.log('\n--- Getters & Setters ---');

// Getters/setters are inherited just like methods

function Temperature(celsius) {
    this._celsius = celsius;
}
Object.defineProperty(Temperature.prototype, 'fahrenheit', {
    get() { return this._celsius * 9/5 + 32; },
    set(f) { this._celsius = (f - 32) * 5/9; },
    enumerable: true,
    configurable: true,
});

const temp = new Temperature(100);
console.log(temp.fahrenheit);   // 212
temp.fahrenheit = 32;
console.log(temp._celsius);     // 0

// Shorthand getter/setter in object literals
const circle2 = {
    _radius: 5,
    get area()     { return Math.PI * this._radius ** 2; },
    get diameter() { return this._radius * 2; },
    set radius(r)  { if (r < 0) throw new Error('negative'); this._radius = r; },
};
console.log(circle2.area.toFixed(2));  // 78.54
circle2.radius = 10;
console.log(circle2.diameter);         // 20


// ============================================================
// SECTION 13: METHOD BORROWING
// ============================================================

console.log('\n--- Method Borrowing ---');

// You can borrow methods from one prototype and use on another object
// via call / apply — without setting up inheritance

const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };

// arrayLike has no .map — borrow from Array.prototype
const mapped = Array.prototype.map.call(arrayLike, x => x.toUpperCase());
console.log(mapped); // ['A', 'B', 'C']

// Common real-world borrow: arguments object
function example() {
    const args = Array.prototype.slice.call(arguments); // convert to real array
    // Modern: Array.from(arguments) or [...arguments]
    return args.map(x => x * 2);
}
console.log(example(1, 2, 3)); // [2, 4, 6]

// Borrow hasOwnProperty safely (for objects created with null prototype)
const safeDict = Object.create(null);
safeDict.key = 'value';
// safeDict.hasOwnProperty('key') — TypeError! no prototype
const has = Object.prototype.hasOwnProperty.call(safeDict, 'key');
console.log('borrowed hasOwnProperty:', has); // true


// ============================================================
// SECTION 14: PROTOTYPE POLLUTION (Security — must know)
// ============================================================

console.log('\n--- Prototype Pollution ---');

// Prototype pollution: attacker adds/modifies properties on Object.prototype
// affecting ALL objects in the application

// Vulnerable merge function
function merge(target, source) {
    for (let key in source) {
        target[key] = source[key]; // no guard — iterates inherited keys too
    }
    return target;
}

const maliciousInput = JSON.parse('{"__proto__": {"isAdmin": true}}');
merge({}, maliciousInput);

const victim = {};
console.log(victim.isAdmin); // true ← POLLUTED — dangerous!

// Fix 1: guard with hasOwnProperty
function safeMerge(target, source) {
    for (let key in source) {
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;
        if (Object.hasOwn(source, key)) {
            target[key] = source[key];
        }
    }
    return target;
}

// Fix 2: use Object.create(null) for data maps (no prototype to pollute)
// Fix 3: use structuredClone / JSON.parse(JSON.stringify()) for deep copy of input


// ============================================================
// SECTION 15: Object.freeze / Object.seal
// ============================================================

console.log('\n--- freeze vs seal ---');

// Object.seal   — no add/delete, but existing props still writable
// Object.freeze — no add/delete/write (shallow — nested objects NOT frozen)

const sealed = Object.seal({ x: 1, y: 2 });
sealed.x = 99;     // ✓ allowed — writable
sealed.z = 3;      // ✗ silently ignored (throws in strict mode)
delete sealed.x;   // ✗ silently ignored
console.log(sealed); // { x: 99, y: 2 }

const frozen = Object.freeze({ a: 1, nested: { b: 2 } });
frozen.a = 99;          // ✗ silently ignored
frozen.nested.b = 99;   // ✓ nested object is NOT frozen — still mutable!
console.log(frozen.a);          // 1   — protected
console.log(frozen.nested.b);   // 99  — not protected (shallow freeze)

// Deep freeze implementation
function deepFreeze(obj) {
    Object.getOwnPropertyNames(obj).forEach(key => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            deepFreeze(obj[key]);
        }
    });
    return Object.freeze(obj);
}

const fullyFrozen = deepFreeze({ a: 1, nested: { b: 2 } });
fullyFrozen.nested.b = 99; // silently ignored
console.log(fullyFrozen.nested.b); // 2 ✓


// ============================================================
// SECTION 16: Symbol.hasInstance — customize instanceof
// ============================================================

console.log('\n--- Symbol.hasInstance ---');

class EvenNumber {
    static [Symbol.hasInstance](num) {
        return Number.isInteger(num) && num % 2 === 0;
    }
}

console.log(2  instanceof EvenNumber); // true
console.log(3  instanceof EvenNumber); // false
console.log(10 instanceof EvenNumber); // true
// instanceof no longer checks prototype chain — runs the custom method
