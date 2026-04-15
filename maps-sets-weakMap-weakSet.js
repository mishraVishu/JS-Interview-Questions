// ============================================================
// MAP, SET, WEAKMAP, WEAKSET — Senior Dev Reference (5+ yrs)
// ============================================================


// ============================================================
// SECTION 1: MAP
// ============================================================
// A Map is a collection of key-value pairs where:
// - Keys can be ANY type (objects, functions, primitives)
// - Insertion order is preserved
// - No duplicate keys
// - Better performance than Object for frequent add/delete

console.log('============ MAP ============');

// ─────────────────────────────────────────────
// Creating a Map
// ─────────────────────────────────────────────
const map = new Map();

// From an array of [key, value] pairs
const map2 = new Map([
    ['name', 'Vaishali'],
    ['age', 29],
    ['city', 'Mumbai'],
]);
console.log('map2:', map2);

// ─────────────────────────────────────────────
// map.set(key, value) — adds or updates a key
// Returns the Map itself — chainable
// ─────────────────────────────────────────────
map.set('name', 'Vaishali');
map.set('age', 29);
map.set(1, 'numeric key');           // number as key
map.set(true, 'boolean key');        // boolean as key

const objKey = { id: 1 };
map.set(objKey, 'object as key');    // object as key — unique to Map

// Chaining
map.set('a', 1).set('b', 2).set('c', 3);

console.log('\nmap.set():', map);

// ─────────────────────────────────────────────
// map.get(key) — retrieves value by key
// Returns undefined if key not found
// ─────────────────────────────────────────────
console.log('\nmap.get():');
console.log('  name:', map.get('name'));       // 'Vaishali'
console.log('  age:', map.get('age'));         // 29
console.log('  objKey:', map.get(objKey));     // 'object as key'
console.log('  missing:', map.get('x'));       // undefined

// ─────────────────────────────────────────────
// map.has(key) — checks if key exists
// Returns boolean
// ─────────────────────────────────────────────
console.log('\nmap.has():');
console.log('  has name:', map.has('name'));   // true
console.log('  has x:', map.has('x'));         // false

// ─────────────────────────────────────────────
// map.delete(key) — removes a key-value pair
// Returns true if key existed, false otherwise
// ─────────────────────────────────────────────
console.log('\nmap.delete():');
console.log('  delete age:', map.delete('age'));    // true
console.log('  delete x:', map.delete('x'));        // false
console.log('  after delete, has age:', map.has('age')); // false

// ─────────────────────────────────────────────
// map.size — number of key-value pairs (property, not method)
// ─────────────────────────────────────────────
console.log('\nmap.size:', map.size);

// ─────────────────────────────────────────────
// map.clear() — removes ALL entries
// ─────────────────────────────────────────────
const tempMap = new Map([['x', 1], ['y', 2]]);
tempMap.clear();
console.log('\ntempMap after clear:', tempMap.size); // 0

// ─────────────────────────────────────────────
// map.keys() — returns iterator of all keys
// ─────────────────────────────────────────────
const fruitMap = new Map([['apple', 1], ['banana', 2], ['cherry', 3]]);
console.log('\nmap.keys():');
for (const key of fruitMap.keys()) {
    console.log(' ', key); // apple, banana, cherry
}

// ─────────────────────────────────────────────
// map.values() — returns iterator of all values
// ─────────────────────────────────────────────
console.log('\nmap.values():');
for (const val of fruitMap.values()) {
    console.log(' ', val); // 1, 2, 3
}

// ─────────────────────────────────────────────
// map.entries() — returns iterator of [key, value] pairs
// Default iterator — same as for...of on map directly
// ─────────────────────────────────────────────
console.log('\nmap.entries():');
for (const [key, val] of fruitMap.entries()) {
    console.log(`  ${key} → ${val}`);
}

// ─────────────────────────────────────────────
// map.forEach(callback) — iterates with (value, key, map)
// NOTE: value comes FIRST (opposite of Object.entries)
// ─────────────────────────────────────────────
console.log('\nmap.forEach():');
fruitMap.forEach((value, key) => {
    console.log(`  ${key}: ${value}`);
});

// ─────────────────────────────────────────────
// Map vs Object — key differences
// ─────────────────────────────────────────────
// Object: keys must be string/symbol, no guaranteed order for non-string
// Map:    keys can be anything, insertion order always preserved
// Object: has prototype — risk of key collision (__proto__, toString etc)
// Map:    no prototype keys — clean
// Object: no built-in size
// Map:    .size built in

// Convert Map → Object
const obj = Object.fromEntries(fruitMap);
console.log('\nMap → Object:', obj); // { apple: 1, banana: 2, cherry: 3 }

// Convert Object → Map
const obj2 = { x: 10, y: 20 };
const mapFromObj = new Map(Object.entries(obj2));
console.log('Object → Map:', mapFromObj);


// ============================================================
// SECTION 2: SET
// ============================================================
// A Set is a collection of UNIQUE values:
// - Values can be any type
// - No duplicates (uses SameValueZero equality)
// - Insertion order preserved
// - No index-based access (unlike Array)

console.log('\n============ SET ============');

// ─────────────────────────────────────────────
// Creating a Set
// ─────────────────────────────────────────────
const set = new Set();
const set2 = new Set([1, 2, 3, 2, 1]); // duplicates removed automatically
console.log('set2:', set2); // Set {1, 2, 3}

// ─────────────────────────────────────────────
// set.add(value) — adds a value
// Returns the Set itself — chainable
// Duplicate values are silently ignored
// ─────────────────────────────────────────────
set.add(1).add(2).add(3).add(2).add(1); // duplicates ignored
console.log('\nset.add():', set); // Set {1, 2, 3}

// ─────────────────────────────────────────────
// set.has(value) — checks if value exists
// Returns boolean — O(1) lookup (faster than array.includes)
// ─────────────────────────────────────────────
console.log('\nset.has():');
console.log('  has 1:', set.has(1));  // true
console.log('  has 9:', set.has(9));  // false

// ─────────────────────────────────────────────
// set.delete(value) — removes a value
// Returns true if value existed, false otherwise
// ─────────────────────────────────────────────
console.log('\nset.delete():');
console.log('  delete 2:', set.delete(2)); // true
console.log('  delete 9:', set.delete(9)); // false
console.log('  after delete:', set);       // Set {1, 3}

// ─────────────────────────────────────────────
// set.size — number of unique values
// ─────────────────────────────────────────────
console.log('\nset.size:', set.size); // 2

// ─────────────────────────────────────────────
// set.clear() — removes ALL values
// ─────────────────────────────────────────────
const tempSet = new Set([1, 2, 3]);
tempSet.clear();
console.log('\ntempSet after clear:', tempSet.size); // 0

// ─────────────────────────────────────────────
// set.keys() — same as values() (for Map compatibility)
// set.values() — iterator of all values
// set.entries() — iterator of [value, value] pairs
// ─────────────────────────────────────────────
const numSet = new Set([10, 20, 30]);

console.log('\nset.values():');
for (const val of numSet.values()) {
    console.log(' ', val); // 10, 20, 30
}

console.log('\nset.entries():');
for (const [val1, val2] of numSet.entries()) {
    console.log(`  [${val1}, ${val2}]`); // [10,10], [20,20], [30,30]
}

// ─────────────────────────────────────────────
// set.forEach(callback) — iterates with (value, value, set)
// value appears twice (for Map API compatibility)
// ─────────────────────────────────────────────
console.log('\nset.forEach():');
numSet.forEach((value) => {
    console.log(' ', value); // 10, 20, 30
});

// ─────────────────────────────────────────────
// Common Set Operations (not built-in, but easy to implement)
// ─────────────────────────────────────────────
const A = new Set([1, 2, 3, 4]);
const B = new Set([3, 4, 5, 6]);

// Union — all elements from both
const union = new Set([...A, ...B]);
console.log('\nUnion:', union); // {1,2,3,4,5,6}

// Intersection — only elements in BOTH
const intersection = new Set([...A].filter(x => B.has(x)));
console.log('Intersection:', intersection); // {3,4}

// Difference — elements in A but NOT in B
const difference = new Set([...A].filter(x => !B.has(x)));
console.log('Difference (A-B):', difference); // {1,2}

// Subset check — is A a subset of B?
const isSubset = [...A].every(x => B.has(x));
console.log('A subset of B:', isSubset); // false

// Remove duplicates from array (most common use case)
const arr = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(arr)];
console.log('\nRemove duplicates:', unique); // [1,2,3,4]


// ============================================================
// SECTION 3: WEAKMAP
// ============================================================
// A WeakMap is like Map but:
// - Keys MUST be objects (not primitives)
// - Keys are held WEAKLY — eligible for garbage collection
// - NOT iterable — no .keys(), .values(), .forEach(), .size
// - Use case: private data, caching without memory leaks

console.log('\n============ WEAKMAP ============');

// ─────────────────────────────────────────────
// Creating a WeakMap
// ─────────────────────────────────────────────
const weakMap = new WeakMap();

// ─────────────────────────────────────────────
// weakMap.set(key, value) — key MUST be an object
// ─────────────────────────────────────────────
let user1 = { name: 'Vaishali' };
let user2 = { name: 'Rahul' };

weakMap.set(user1, { role: 'admin', visits: 5 });
weakMap.set(user2, { role: 'user', visits: 2 });
console.log('weakMap.set() done');

// ─────────────────────────────────────────────
// weakMap.get(key) — returns value for key
// ─────────────────────────────────────────────
console.log('\nweakMap.get():');
console.log('  user1 data:', weakMap.get(user1)); // { role: 'admin', visits: 5 }
console.log('  user2 data:', weakMap.get(user2)); // { role: 'user', visits: 2 }

// ─────────────────────────────────────────────
// weakMap.has(key) — checks if key exists
// ─────────────────────────────────────────────
console.log('\nweakMap.has():');
console.log('  has user1:', weakMap.has(user1)); // true

// ─────────────────────────────────────────────
// weakMap.delete(key) — removes entry
// ─────────────────────────────────────────────
weakMap.delete(user2);
console.log('\nweakMap after delete user2:');
console.log('  has user2:', weakMap.has(user2)); // false

// ─────────────────────────────────────────────
// Garbage Collection — the KEY feature
// When object reference is gone → entry auto-removed
// ─────────────────────────────────────────────
let tempUser = { name: 'Temp' };
weakMap.set(tempUser, 'temporary data');
console.log('\nhas tempUser:', weakMap.has(tempUser)); // true

tempUser = null; // remove the only reference
// Now GC can collect the object AND auto-remove from WeakMap
// No memory leak — WeakMap doesn't prevent GC

// ─────────────────────────────────────────────
// Use Case 1: Storing private data per instance
// ─────────────────────────────────────────────
const privateData = new WeakMap();

class BankAccount {
    constructor(owner, balance) {
        privateData.set(this, { balance }); // balance is private
        this.owner = owner;                 // owner is public
    }
    deposit(amount) {
        privateData.get(this).balance += amount;
    }
    getBalance() {
        return privateData.get(this).balance; // controlled access
    }
}

const account = new BankAccount('Vaishali', 1000);
account.deposit(500);
console.log('\nBankAccount balance:', account.getBalance()); // 1500
console.log('Direct access:', account.balance);             // undefined — truly private

// ─────────────────────────────────────────────
// Use Case 2: Caching computed results
// ─────────────────────────────────────────────
const cache = new WeakMap();

function processUser(user) {
    if (cache.has(user)) {
        console.log('  cache hit');
        return cache.get(user);
    }
    const result = { ...user, processed: true, timestamp: Date.now() };
    cache.set(user, result);
    console.log('  cache miss — computed');
    return result;
}

const userObj = { name: 'Vaishali', age: 29 };
console.log('\nCaching:');
processUser(userObj); // cache miss
processUser(userObj); // cache hit
// When userObj = null → cache entry auto-removed — no memory leak


// ============================================================
// SECTION 4: WEAKSET
// ============================================================
// A WeakSet is like Set but:
// - Values MUST be objects (not primitives)
// - Values held WEAKLY — garbage collectible
// - NOT iterable — no .values(), .forEach(), .size
// - Use case: tracking object membership without memory leaks

console.log('\n============ WEAKSET ============');

// ─────────────────────────────────────────────
// Creating a WeakSet
// ─────────────────────────────────────────────
const weakSet = new WeakSet();

// ─────────────────────────────────────────────
// weakSet.add(value) — value MUST be an object
// ─────────────────────────────────────────────
let objA = { id: 1 };
let objB = { id: 2 };
let objC = { id: 3 };

weakSet.add(objA);
weakSet.add(objB);
weakSet.add(objC);
console.log('weakSet.add() done');

// ─────────────────────────────────────────────
// weakSet.has(value) — checks membership
// ─────────────────────────────────────────────
console.log('\nweakSet.has():');
console.log('  has objA:', weakSet.has(objA)); // true
console.log('  has {}:', weakSet.has({}));     // false — different reference

// ─────────────────────────────────────────────
// weakSet.delete(value) — removes value
// ─────────────────────────────────────────────
weakSet.delete(objB);
console.log('\nweakSet after delete objB:');
console.log('  has objB:', weakSet.has(objB)); // false

// ─────────────────────────────────────────────
// Garbage Collection
// ─────────────────────────────────────────────
let tempObj = { temp: true };
weakSet.add(tempObj);
console.log('\nhas tempObj:', weakSet.has(tempObj)); // true
tempObj = null; // GC can now collect — auto-removed from WeakSet

// ─────────────────────────────────────────────
// Use Case 1: Track which DOM nodes have been processed
// ─────────────────────────────────────────────
const processedNodes = new WeakSet();

function processNode(node) {
    if (processedNodes.has(node)) {
        console.log('  already processed, skipping');
        return;
    }
    // do work...
    processedNodes.add(node);
    console.log('  node processed');
}

const node1 = { tagName: 'div', id: 'main' }; // simulate DOM node
processNode(node1); // processed
processNode(node1); // skipped — already done
// When node1 is removed from DOM → GC collects → auto-removed from WeakSet

// ─────────────────────────────────────────────
// Use Case 2: Prevent circular reference / detect visited nodes
// ─────────────────────────────────────────────
function deepClone(obj, visited = new WeakSet()) {
    if (typeof obj !== 'object' || obj === null) return obj;
    if (visited.has(obj)) return '[Circular]'; // circular reference detected
    visited.add(obj);

    const clone = {};
    for (const key in obj) {
        clone[key] = deepClone(obj[key], visited);
    }
    return clone;
}

const original = { a: 1, b: { c: 2 } };
console.log('\ndeepClone:', deepClone(original)); // { a:1, b:{ c:2 } }


// ============================================================
// SECTION 5: COMPARISON TABLE
// ============================================================

console.log('\n============ COMPARISON ============');

// ┌─────────────┬────────────┬────────────┬─────────────┬─────────────┐
// │             │    Map     │    Set     │   WeakMap   │   WeakSet   │
// ├─────────────┼────────────┼────────────┼─────────────┼─────────────┤
// │ Key/Value   │ key→value  │ values     │ key→value   │ values      │
// │ Key types   │ any        │ any        │ objects only│ objects only│
// │ Duplicates  │ no dup keys│ no dup vals│ no dup keys │ no dup vals │
// │ Iterable    │ YES        │ YES        │ NO          │ NO          │
// │ .size       │ YES        │ YES        │ NO          │ NO          │
// │ GC friendly │ NO         │ NO         │ YES         │ YES         │
// │ Use case    │ key-value  │ unique list│ private data│ membership  │
// └─────────────┴────────────┴────────────┴─────────────┴─────────────┘


// ============================================================
// SECTION 6: INTERVIEW QUESTIONS (5+ Years Experience)
// ============================================================

console.log('\n\n=== INTERVIEW QUESTIONS (5+ yrs) ===\n');

// ─────────────────────────────────────────────
// Q1: Map vs Object — when would you use each?
// ─────────────────────────────────────────────
console.log('Q1: Map vs Object');

// Use MAP when:
// - Keys are not strings/symbols (objects, numbers, functions as keys)
// - Need guaranteed insertion order
// - Frequent add/delete operations (Map is optimized for this)
// - Need .size without manual tracking
// - No risk of key collision with prototype properties

// Use OBJECT when:
// - Working with JSON (Map doesn't serialize to JSON easily)
// - Simple string-keyed records
// - Need prototype/method inheritance

const mapObj = new Map();
mapObj.set(() => {}, 'function key'); // ✓ Map supports this
// { [() => {}]: 'value' }            // ✗ Object — function as key becomes "[object Object]"

// JSON caveat — Map doesn't stringify correctly
const m = new Map([['a', 1]]);
console.log('  Map JSON:', JSON.stringify(m));             // {} — loses data!
console.log('  Map→Obj JSON:', JSON.stringify(Object.fromEntries(m))); // {"a":1}


// ─────────────────────────────────────────────
// Q2: Why are WeakMap/WeakSet NOT iterable?
// ─────────────────────────────────────────────
console.log('\nQ2: Why WeakMap/WeakSet are not iterable');

// Because their entries can be garbage collected AT ANY TIME.
// If you could iterate, the list could change mid-iteration
// (entries disappearing as GC runs) — unpredictable, non-deterministic.
// The spec deliberately omits iteration to avoid this inconsistency.
// This is a fundamental design decision, not an oversight.


// ─────────────────────────────────────────────
// Q3: Implement Set operations — union, intersection, difference
// ─────────────────────────────────────────────
console.log('\nQ3: Set operations');

class SuperSet extends Set {
    union(otherSet) {
        return new SuperSet([...this, ...otherSet]);
    }
    intersection(otherSet) {
        return new SuperSet([...this].filter(x => otherSet.has(x)));
    }
    difference(otherSet) {
        return new SuperSet([...this].filter(x => !otherSet.has(x)));
    }
    isSubsetOf(otherSet) {
        return [...this].every(x => otherSet.has(x));
    }
}

const s1 = new SuperSet([1, 2, 3, 4]);
const s2 = new SuperSet([3, 4, 5, 6]);
console.log('  union:', s1.union(s2));             // {1,2,3,4,5,6}
console.log('  intersection:', s1.intersection(s2)); // {3,4}
console.log('  difference:', s1.difference(s2));     // {1,2}
console.log('  isSubset:', s1.isSubsetOf(s2));        // false


// ─────────────────────────────────────────────
// Q4: Implement an LRU Cache using Map
// ─────────────────────────────────────────────
console.log('\nQ4: LRU Cache using Map');

// Map preserves insertion order AND allows O(1) get/set/delete
// → perfect for LRU: most recently used goes to end

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // insertion order = usage order
    }

    get(key) {
        if (!this.cache.has(key)) return -1;
        const val = this.cache.get(key);
        // Move to end (most recently used)
        this.cache.delete(key);
        this.cache.set(key, val);
        return val;
    }

    put(key, value) {
        if (this.cache.has(key)) this.cache.delete(key);
        else if (this.cache.size >= this.capacity) {
            // Delete LRU — first key in Map (oldest insertion)
            this.cache.delete(this.cache.keys().next().value);
        }
        this.cache.set(key, value); // add to end (most recent)
    }
}

const lru = new LRUCache(3);
lru.put('a', 1);
lru.put('b', 2);
lru.put('c', 3);
lru.get('a');       // access 'a' — moves to end
lru.put('d', 4);   // evicts 'b' (LRU)
console.log('  has b:', lru.get('b')); // -1 (evicted)
console.log('  has a:', lru.get('a')); // 1 (still present)


// ─────────────────────────────────────────────
// Q5: WeakMap for truly private class fields
// (before # private fields were introduced in ES2022)
// ─────────────────────────────────────────────
console.log('\nQ5: WeakMap private fields pattern');

const _private = new WeakMap();

class Person {
    constructor(name, ssn) {
        _private.set(this, { ssn }); // ssn is truly private
        this.name = name;
    }
    getSSN() {
        return _private.get(this).ssn;
    }
}

const p = new Person('Vaishali', '123-45-6789');
console.log('  name:', p.name);         // 'Vaishali' — public
console.log('  ssn direct:', p.ssn);    // undefined — not on instance
console.log('  ssn method:', p.getSSN()); // '123-45-6789' — controlled


// ─────────────────────────────────────────────
// Q6: What is SameValueZero equality in Set/Map?
// ─────────────────────────────────────────────
console.log('\nQ6: SameValueZero equality');

// Set uses SameValueZero — like === but treats NaN as equal to NaN
const s = new Set();
s.add(NaN);
s.add(NaN); // NaN === NaN is false, but Set treats them as duplicate
console.log('  NaN duplicates:', s.size); // 1 — only one NaN stored

s.add(0);
s.add(-0); // 0 === -0 is true, SameValueZero also treats as equal
console.log('  0 and -0:', s.size); // 2 — only one 0 stored


// ─────────────────────────────────────────────
// Q7: How to group data using Map (like SQL GROUP BY)
// ─────────────────────────────────────────────
console.log('\nQ7: Grouping with Map');

const people = [
    { name: 'Alice', dept: 'Engineering' },
    { name: 'Bob',   dept: 'Design' },
    { name: 'Carol', dept: 'Engineering' },
    { name: 'Dave',  dept: 'Design' },
    { name: 'Eve',   dept: 'Engineering' },
];

const grouped = people.reduce((map, person) => {
    const group = map.get(person.dept) ?? [];
    group.push(person.name);
    map.set(person.dept, group);
    return map;
}, new Map());

grouped.forEach((names, dept) => {
    console.log(`  ${dept}:`, names);
});
// Engineering: ['Alice', 'Carol', 'Eve']
// Design: ['Bob', 'Dave']


// ─────────────────────────────────────────────
// Q8: Detect duplicate values in an array using Set — O(n)
// ─────────────────────────────────────────────
console.log('\nQ8: Detect duplicates with Set');

function hasDuplicates(arr) {
    return arr.length !== new Set(arr).size;
}

function findDuplicates(arr) {
    const seen = new Set();
    const dupes = new Set();
    for (const item of arr) {
        if (seen.has(item)) dupes.add(item);
        else seen.add(item);
    }
    return [...dupes];
}

console.log('  hasDuplicates [1,2,2,3]:', hasDuplicates([1, 2, 2, 3])); // true
console.log('  findDuplicates [1,2,2,3,3]:', findDuplicates([1, 2, 2, 3, 3])); // [2,3]


// ─────────────────────────────────────────────
// Q9: WeakMap vs Map — memory leak scenario
// ─────────────────────────────────────────────
console.log('\nQ9: Memory leak — Map vs WeakMap');

// Map — MEMORY LEAK
// const domData = new Map();
// function setup(element) {
//     domData.set(element, { clicks: 0 });  // element held strongly
// }
// element.remove(); // removed from DOM, but Map still holds reference
//                   // → element NEVER garbage collected → memory leak

// WeakMap — NO LEAK
// const domData = new WeakMap();
// function setup(element) {
//     domData.set(element, { clicks: 0 }); // held weakly
// }
// element.remove(); // removed from DOM
//                   // → no other references → GC collects → WeakMap auto-cleans

console.log('  Map holds objects strongly  → memory leak risk');
console.log('  WeakMap holds objects weakly → GC safe, no leaks');


// ─────────────────────────────────────────────
// Q10: Memoization using Map (with object args using WeakMap)
// ─────────────────────────────────────────────
console.log('\nQ10: Memoization with Map/WeakMap');

// For primitive args — use Map
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log('  cache hit:', key);
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

const factorial = memoize(function f(n) {
    return n <= 1 ? 1 : n * f(n - 1);
});

console.log('  5! =', factorial(5));  // computed
console.log('  5! =', factorial(5));  // cache hit

// For object args — use WeakMap (avoids memory leak)
const objectMemo = new WeakMap();
function processExpensive(obj) {
    if (objectMemo.has(obj)) return objectMemo.get(obj);
    const result = { ...obj, computed: true };
    objectMemo.set(obj, result);
    return result;
}
