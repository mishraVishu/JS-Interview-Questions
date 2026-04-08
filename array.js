// ============================================================
// ARRAYS IN JAVASCRIPT — Senior Dev Reference (5+ yrs)
// ============================================================
// An array is an ordered, indexed, mutable collection.
// Arrays in JS are objects under the hood: typeof [] === 'object'
// They are zero-indexed and dynamically sized.

// ============================================================
// SECTION 1: CREATION
// ============================================================

const literal = [1, 2, 3];
const fromConstructor = new Array(3);          // [ <3 empty items> ] — sparse!
const fromConstructorFilled = new Array(3).fill(0); // [0, 0, 0]
const fromArray = Array.from({ length: 3 }, (_, i) => i + 1); // [1, 2, 3]
const fromSet = Array.from(new Set([1, 1, 2, 3])); // [1, 2, 3] — dedup
const spread = [...'hello'];                    // ['h','e','l','l','o']

console.log('--- Creation ---');
console.log(literal, fromConstructorFilled, fromArray, fromSet, spread);


// ============================================================
// SECTION 2: MUTATION METHODS (modify the original array)
// ============================================================

console.log('\n--- Mutation Methods ---');

// push / pop — end of array  O(1)
const arr = [1, 2, 3];
arr.push(4, 5);       // [1,2,3,4,5]  returns new length
arr.pop();            // [1,2,3,4]    returns removed element
console.log('push/pop:', arr);

// unshift / shift — start of array  O(n) — shifts all indices
arr.unshift(0);       // [0,1,2,3,4]  returns new length
arr.shift();          // [1,2,3,4]    returns removed element
console.log('unshift/shift:', arr);

// splice(start, deleteCount, ...items)
// Mutates in place — most versatile mutation method
const fruits = ['apple', 'banana', 'cherry', 'date'];
const removed = fruits.splice(1, 2, 'blueberry', 'mango');
console.log('splice result:', fruits);   // ['apple','blueberry','mango','date']
console.log('splice removed:', removed); // ['banana','cherry']

// reverse — mutates original!
const nums = [1, 2, 3, 4];
nums.reverse(); // [4,3,2,1]
console.log('reverse:', nums);

// sort — mutates original; default is lexicographic (string compare)
const numbers = [10, 1, 5, 21, 3];
numbers.sort((a, b) => a - b); // ascending numeric
console.log('sort ascending:', numbers);
numbers.sort((a, b) => b - a); // descending numeric
console.log('sort descending:', numbers);

// fill(value, start?, end?)
const filled = [1, 2, 3, 4, 5];
filled.fill(0, 2, 4); // [1,2,0,0,5]
console.log('fill:', filled);

// copyWithin(target, start?, end?) — rarely used, zero-allocation copy
const cw = [1, 2, 3, 4, 5];
cw.copyWithin(0, 3); // [4,5,3,4,5]  copies items from index 3 to index 0
console.log('copyWithin:', cw);


// ============================================================
// SECTION 3: NON-MUTATING METHODS (return new array/value)
// ============================================================

console.log('\n--- Non-Mutating Methods ---');

const original = [1, 2, 3, 4, 5];

// slice(start, end) — shallow copy of a portion [start, end)
console.log('slice(1,3):', original.slice(1, 3));  // [2,3]
console.log('slice(-2):', original.slice(-2));      // [4,5]

// concat — merge arrays
console.log('concat:', original.concat([6, 7], [8])); // [1..8]

// flat(depth) / flatMap
const nested = [1, [2, [3, [4]]]];
console.log('flat(1):', nested.flat());     // [1,2,[3,[4]]]
console.log('flat(Inf):', nested.flat(Infinity)); // [1,2,3,4]

const sentences = ['hello world', 'foo bar'];
console.log('flatMap:', sentences.flatMap(s => s.split(' '))); // ['hello','world','foo','bar']

// join — array to string
console.log('join:', [1, 2, 3].join(' - ')); // "1 - 2 - 3"

// indexOf / lastIndexOf — returns index or -1; uses ===
const dup = [1, 2, 3, 2, 1];
console.log('indexOf(2):', dup.indexOf(2));         // 1
console.log('lastIndexOf(2):', dup.lastIndexOf(2)); // 3

// includes — boolean; handles NaN (unlike indexOf)
console.log('includes(3):', original.includes(3)); // true
console.log('includes(NaN):', [NaN].includes(NaN)); // true  ← key difference from indexOf

// at(index) — supports negative indexing (ES2022)
console.log('at(-1):', original.at(-1));  // 5
console.log('at(0):', original.at(0));    // 1


// ============================================================
// SECTION 4: ITERATION / HIGHER-ORDER METHODS
// ============================================================

console.log('\n--- Iteration / HOF ---');

const data = [1, 2, 3, 4, 5, 6];

// forEach — side effects only; returns undefined
data.forEach((val, i) => console.log(val, i));

// map — transform each element, returns new array same length
const doubled = data.map(x => x * 2);
console.log('map:', doubled);

// filter — returns elements that pass predicate
const evens = data.filter(x => x % 2 === 0);
console.log('filter:', evens);

// reduce(callback, initialValue) — fold to single value
const sum = data.reduce((acc, x) => acc + x, 0);
console.log('reduce sum:', sum); // 21

// reduceRight — reduce from right to left
const nested2 = [[1, 2], [3, 4], [5, 6]];
const flat2 = nested2.reduceRight((acc, arr) => acc.concat(arr), []);
console.log('reduceRight flatten:', flat2); // [5,6,3,4,1,2]

// find / findIndex — first match or undefined/-1
const found = data.find(x => x > 3);
console.log('find:', found); // 4
const foundIdx = data.findIndex(x => x > 3);
console.log('findIndex:', foundIdx); // 3

// findLast / findLastIndex (ES2023)
console.log('findLast:', data.findLast(x => x % 2 === 0));      // 6
console.log('findLastIndex:', data.findLastIndex(x => x % 2 === 0)); // 5

// some / every
console.log('some >5:', data.some(x => x > 5));    // true
console.log('every >0:', data.every(x => x > 0));  // true

// keys / values / entries — iterators
console.log('entries:', [...data.entries()].slice(0, 3)); // [[0,1],[1,2],[2,3]]


// ============================================================
// SECTION 5: STATIC METHODS
// ============================================================

console.log('\n--- Static Methods ---');

console.log('Array.isArray([]):', Array.isArray([]));         // true
console.log('Array.isArray({}):', Array.isArray({}));         // false
console.log('Array.from("abc"):', Array.from('abc'));          // ['a','b','c']
console.log('Array.of(1,2,3):', Array.of(1, 2, 3));           // [1,2,3]
// Array.of vs new Array: Array.of(3) → [3], new Array(3) → [empty × 3]


// ============================================================
// SECTION 6: TOSTRING / TOSORTED / TOREVERSED / TOWITH (ES2023)
// ============================================================

console.log('\n--- ES2023 Non-Mutating Counterparts ---');

const base = [3, 1, 4, 1, 5];
console.log('toSorted:', base.toSorted((a, b) => a - b)); // sorted copy
console.log('toReversed:', base.toReversed());             // reversed copy
console.log('toSpliced:', base.toSpliced(1, 2, 99));       // spliced copy
console.log('with(2, 99):', base.with(2, 99));             // copy with index replaced
console.log('original unchanged:', base);                   // [3,1,4,1,5] ✓


// ============================================================
// SECTION 7: INTERVIEW QUESTIONS — SENIOR LEVEL
// ============================================================

console.log('\n\n=== INTERVIEW QUESTIONS ===\n');

// ─────────────────────────────────────────────
// Q1: Flatten a deeply nested array without flat()
// ─────────────────────────────────────────────
console.log('Q1: Flatten nested array');

function flattenDeep(arr) {
  return arr.reduce(
    (acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    []
  );
}
console.log(flattenDeep([1, [2, [3, [4, [5]]]]])); // [1,2,3,4,5]


// ─────────────────────────────────────────────
// Q2: Remove duplicates from an array (3 approaches)
// ─────────────────────────────────────────────
console.log('\nQ2: Remove duplicates');

const withDups = [1, 2, 2, 3, 3, 3, 4];

// O(n) — Set preserves insertion order
const deduped1 = [...new Set(withDups)];

// O(n) — filter with indexOf (less performant, but no Set)
const deduped2 = withDups.filter((val, idx) => withDups.indexOf(val) === idx);

// O(n) — reduce approach
const deduped3 = withDups.reduce((acc, val) => acc.includes(val) ? acc : [...acc, val], []);

console.log(deduped1, deduped2, deduped3); // [1,2,3,4] all three


// ─────────────────────────────────────────────
// Q3: Group array of objects by a key
// ─────────────────────────────────────────────
console.log('\nQ3: Group by key');

const people = [
  { name: 'Alice', dept: 'Eng' },
  { name: 'Bob',   dept: 'HR' },
  { name: 'Carol', dept: 'Eng' },
  { name: 'Dave',  dept: 'HR' },
];

// Classic reduce approach
const grouped = people.reduce((acc, person) => {
  (acc[person.dept] = acc[person.dept] || []).push(person);
  return acc;
}, {});
console.log(grouped);

// ES2024: Object.groupBy (no reduce needed)
// const grouped2 = Object.groupBy(people, p => p.dept);


// ─────────────────────────────────────────────
// Q4: Implement Array.prototype.map from scratch
// ─────────────────────────────────────────────
console.log('\nQ4: Custom map implementation');

Array.prototype.myMap = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) { // respect sparse arrays (holes)
      result[i] = callback(this[i], i, this);
    }
  }
  return result;
};
console.log([1, 2, 3].myMap(x => x * 10)); // [10,20,30]


// ─────────────────────────────────────────────
// Q5: Implement Array.prototype.reduce from scratch
// ─────────────────────────────────────────────
console.log('\nQ5: Custom reduce implementation');

Array.prototype.myReduce = function(callback, initialValue) {
  let acc;
  let startIdx;

  if (arguments.length < 2) {
    if (this.length === 0) throw new TypeError('Reduce of empty array with no initial value');
    acc = this[0];
    startIdx = 1;
  } else {
    acc = initialValue;
    startIdx = 0;
  }

  for (let i = startIdx; i < this.length; i++) {
    if (i in this) {
      acc = callback(acc, this[i], i, this);
    }
  }
  return acc;
};
console.log([1, 2, 3, 4].myReduce((acc, x) => acc + x, 0)); // 10


// ─────────────────────────────────────────────
// Q6: Chunk an array into pieces of size n
// ─────────────────────────────────────────────
console.log('\nQ6: Chunk array');

function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
console.log(chunk([1, 2, 3, 4, 5, 6, 7], 3)); // [[1,2,3],[4,5,6],[7]]


// ─────────────────────────────────────────────
// Q7: Intersection, Union, Difference of two arrays
// ─────────────────────────────────────────────
console.log('\nQ7: Set operations');

const a = [1, 2, 3, 4, 5];
const b = [3, 4, 5, 6, 7];

const union        = [...new Set([...a, ...b])];           // [1,2,3,4,5,6,7]
const intersection = a.filter(x => b.includes(x));         // [3,4,5]
const difference   = a.filter(x => !b.includes(x));        // [1,2]  — in a but not b
const symDiff      = [...a.filter(x => !b.includes(x)),    // [1,2,6,7]
                       ...b.filter(x => !a.includes(x))];

console.log('union:', union);
console.log('intersection:', intersection);
console.log('difference (a-b):', difference);
console.log('symmetric diff:', symDiff);


// ─────────────────────────────────────────────
// Q8: Why does [].sort() sort lexicographically? Gotcha.
// ─────────────────────────────────────────────
console.log('\nQ8: sort() gotcha');

const gotcha = [10, 9, 2, 1, 100];
console.log('default sort (WRONG for nums):', [...gotcha].sort());       // [1,10,100,2,9]
console.log('numeric sort (CORRECT):', [...gotcha].sort((a, b) => a - b)); // [1,2,9,10,100]


// ─────────────────────────────────────────────
// Q9: What is a sparse array? How does it behave?
// ─────────────────────────────────────────────
console.log('\nQ9: Sparse arrays');

const sparse = [1, , , 4]; // holes at index 1 and 2
console.log('length:', sparse.length);      // 4
console.log('1 in sparse:', 1 in sparse);   // false — hole
console.log('0 in sparse:', 0 in sparse);   // true
sparse.forEach(v => console.log(v));        // 1, 4  — holes are SKIPPED by forEach/map/filter
// But: Array.from(sparse) fills holes with undefined


// ─────────────────────────────────────────────
// Q10: Compose pipe with reduce
// ─────────────────────────────────────────────
console.log('\nQ10: Compose/Pipe via reduce');

const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const pipe    = (...fns) => x => fns.reduce((v, f) => f(v), x);

const double  = x => x * 2;
const addOne  = x => x + 1;
const square  = x => x * x;

const transform = pipe(double, addOne, square); // (x*2+1)^2
console.log('pipe(double,addOne,square)(3):', transform(3)); // (6+1)^2 = 49


// ─────────────────────────────────────────────
// Q11: Why is arr.indexOf(NaN) === -1 but arr.includes(NaN) === true?
// ─────────────────────────────────────────────
console.log('\nQ11: NaN in arrays');

const nanArr = [1, NaN, 3];
console.log('indexOf(NaN):', nanArr.indexOf(NaN));    // -1  — uses ===, NaN !== NaN
console.log('includes(NaN):', nanArr.includes(NaN));  // true — uses SameValueZero algorithm


// ─────────────────────────────────────────────
// Q12: Deep clone an array of objects
// ─────────────────────────────────────────────
console.log('\nQ12: Deep clone array of objects');

const objArr = [{ a: 1, nested: { b: 2 } }];

// Shallow — nested still shared
const shallow = [...objArr];

// Deep — JSON trick (loses functions, undefined, Date, etc.)
const deepJSON = JSON.parse(JSON.stringify(objArr));

// Deep — structuredClone (modern, handles Date, Map, Set, circular refs)
const deep = structuredClone(objArr);

deep[0].nested.b = 99;
console.log('original after deep clone mutation:', objArr[0].nested.b); // 2 — untouched ✓


// ─────────────────────────────────────────────
// Q13: Sort array of objects by multiple keys
// ─────────────────────────────────────────────
console.log('\nQ13: Multi-key sort');

const employees = [
  { name: 'Alice', age: 30, salary: 90000 },
  { name: 'Bob',   age: 25, salary: 80000 },
  { name: 'Carol', age: 30, salary: 85000 },
  { name: 'Dave',  age: 25, salary: 80000 },
];

const sorted = [...employees].sort((x, y) =>
  x.age - y.age || x.salary - y.salary || x.name.localeCompare(y.name)
);
console.log('multi-key sort:', sorted.map(e => `${e.name}(${e.age},${e.salary})`));


// ─────────────────────────────────────────────
// Q14: What does Array.from({ length: 5 }, (_, i) => i) do?
// ─────────────────────────────────────────────
console.log('\nQ14: Array.from with map function');

// Creates [0,1,2,3,4]  — array-like object with length 5, each hole mapped via callback
const range = Array.from({ length: 5 }, (_, i) => i);
console.log('range:', range);

// Generate matrix
const matrix = Array.from({length:3},(_,i) => Array(3).fill(i))
console.log('3x3 matrix:', matrix);
// Common trap: new Array(3).fill([]) — all rows share SAME array reference!


// ─────────────────────────────────────────────
// Q15: Rotate array by k steps
// ─────────────────────────────────────────────
console.log('\nQ15: Rotate array');

function rotate(arr, k) {
  const n = arr.length;
  const steps = ((k % n) + n) % n; // handle negative k and k > n
  return [...arr.slice(-steps), ...arr.slice(0, -steps || n)];
}
console.log('rotate([1,2,3,4,5], 2):', rotate([1, 2, 3, 4, 5], 2));   // [4,5,1,2,3]
console.log('rotate([1,2,3,4,5], -1):', rotate([1, 2, 3, 4, 5], -1)); // [2,3,4,5,1]

// Alternative: In-place Reversal — O(n) time, O(1) space
// Steps: reverse whole → reverse first part → reverse second part
function rotateInPlace(arr, k) {
  const n = arr.length;
  const steps = ((k % n) + n) % n;

  function reverse(arr, l, r) {
    while (l < r) {
      [arr[l], arr[r]] = [arr[r], arr[l]];
      l++; r--;
    }
  }

  reverse(arr, 0, n - 1);       // [1,2,3,4,5] → [5,4,3,2,1]
  reverse(arr, 0, steps - 1);   // [5,4,3,2,1] → [4,5,3,2,1]
  reverse(arr, steps, n - 1);   // [4,5,3,2,1] → [4,5,1,2,3]
  return arr;
}
console.log('rotateInPlace([1,2,3,4,5], 2):', rotateInPlace([1, 2, 3, 4, 5], 2)); // [4,5,1,2,3]
