// ============================================================
// CURRYING IN JAVASCRIPT — Senior Dev Reference (5+ yrs)
// ============================================================
// Currying transforms f(a, b, c) into f(a)(b)(c)
// Each call takes ONE argument and returns a function
// waiting for the next — until all args are collected.


// ============================================================
// SECTION 1: BASIC CURRYING
// ============================================================

console.log('--- Basic Currying ---');

// Non-curried
function addNormal(a, b, c) { return a + b + c; }
console.log(addNormal(1, 2, 3)); // 6

// Curried — manual
function curriedSum(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}
console.log(curriedSum(1)(2)(3)); // 6

// Arrow function shorthand (same thing)
const curriedSumArrow = a => b => c => a + b + c;
console.log(curriedSumArrow(1)(2)(3)); // 6


// ============================================================
// SECTION 2: CURRYING vs PARTIAL APPLICATION
// ============================================================

console.log('\n--- Currying vs Partial Application ---');

// CURRYING — one argument at a time, always
// f(a,b,c) → f(a)(b)(c)
const multiply = a => b => a * b;
const double   = multiply(2);  // fix first arg
const triple   = multiply(3);  // fix first arg
console.log(double(5)); // 10
console.log(triple(5)); // 15

// PARTIAL APPLICATION — fix SOME args (not necessarily one at a time)
// f(a,b,c) → f(a,b)(c)  or  f(a)(b,c)
function sum3(a, b, c) { return a + b + c; }
const add10 = sum3.bind(null, 10);     // fix a=10, wait for b and c
console.log(add10(2, 3));  // 15  — called with TWO remaining args at once

// Key difference:
// Currying    → always unary (one arg per call), strict
// Partial     → fix N args, call remainder however you want, flexible


// ============================================================
// SECTION 3: GENERIC CURRY IMPLEMENTATION
// ============================================================

console.log('\n--- Generic curry() ---');

// Works for any function regardless of argument count
// Uses func.length — the number of declared parameters

function curry(func) {
    return function curriedFunc(...args) {
        if (args.length >= func.length) {
            // have enough args — call the original function
            return func(...args);
        } else {
            // not enough args yet — return function collecting more
            return function(...next) {
                return curriedFunc(...args, ...next);
            };
        }
    };
}

const summision = (a, b, c, d) => a + b + c + d;
const totalSum = curry(summision);

console.log(totalSum(1)(2)(3)(4));     // 10 — one at a time
console.log(totalSum(1, 2)(3)(4));     // 10 — mixed grouping
console.log(totalSum(1)(2, 3)(4));     // 10 — mixed grouping
console.log(totalSum(1, 2, 3, 4));     // 10 — all at once


// ============================================================
// SECTION 4: INFINITE CURRYING
// ============================================================

console.log('\n--- Infinite Currying ---');

// add(1)(2)(3)()... → call with no arg to get result
function add(a) {
    return function(b) {
        if (b === undefined) return a; // no arg → return accumulated value
        return add(a + b);             // arg given → keep accumulating
    };
}

console.log(add(1)(2)(3)());          // 6
console.log(add(1)(2)(3)(4)(5)(6)()); // 21

// How it works:
// add(1)       → returns fn, a=1
// add(1)(2)    → returns add(3), a=3
// add(1)(2)(3) → returns add(6), a=6
// add(1)(2)(3)() → b=undefined → return 6


// ============================================================
// SECTION 5: REAL WORLD USE CASES
// ============================================================

console.log('\n--- Real World Use Cases ---');

// 1. Pre-configured loggers
const log = level => message => console.log(`[${level}] ${message}`);
const info  = log('INFO');
const error = log('ERROR');
const warn  = log('WARN');

info('Server started');    // [INFO] Server started
error('DB connection failed'); // [ERROR] DB connection failed
warn('Memory usage high'); // [WARN] Memory usage high

// 2. API calls with pre-set base URL
const fetchFrom = baseUrl => endpoint => {
    return `GET ${baseUrl}${endpoint}`; // would be fetch() in real code
};
const fetchFromAPI = fetchFrom('https://api.example.com');
console.log(fetchFromAPI('/users'));    // GET https://api.example.com/users
console.log(fetchFromAPI('/products')); // GET https://api.example.com/products

// 3. Tax calculator — fix tax rate, reuse
const calculateTax = rate => amount => amount * (1 + rate / 100);
const withGST  = calculateTax(18);
const withVAT  = calculateTax(12);
console.log(withGST(1000));  // 1180
console.log(withVAT(1000));  // 1120

// 4. DOM manipulation — fix selector, reuse updater
function updateElementText(id) {
    return function(content) {
        // document.querySelector('#' + id).textContent = content;
        console.log(`Set #${id} → "${content}"`);
    };
}
const updateHeader = updateElementText('heading');
const updateFooter = updateElementText('footer');
updateHeader('Hello Vaishali');
updateFooter('© 2026');


// ============================================================
// SECTION 6: INTERVIEW QUESTIONS
// ============================================================

console.log('\n\n=== INTERVIEW QUESTIONS ===\n');

// ─────────────────────────────────────────────
// Q1: sum(2)(6)(1) — basic curried sum
// ─────────────────────────────────────────────
console.log('Q1: sum(2)(6)(1)');

const sum = a => b => c => a + b + c;
console.log(sum(2)(6)(1)); // 9


// ─────────────────────────────────────────────
// Q2: evaluate("sum")(4)(2) → 6
// ─────────────────────────────────────────────
console.log('\nQ2: evaluate operations');

function evaluate(operation) {
    return function(a) {
        return function(b) {
            if (operation === 'sum')      return a + b;
            if (operation === 'multiply') return a * b;
            if (operation === 'divide')   return a / b;
            if (operation === 'subtract') return a - b;
            throw new Error(`Unknown operation: ${operation}`);
        };
    };
}

console.log(evaluate('sum')(4)(2));      // 6
console.log(evaluate('multiply')(4)(2)); // 8
console.log(evaluate('divide')(4)(2));   // 2
console.log(evaluate('subtract')(4)(2)); // 2

// Real power — reusable partially applied functions
const multiplyBy = evaluate('multiply');
const double2    = multiplyBy(2);
console.log(double2(5));  // 10
console.log(double2(10)); // 20


// ─────────────────────────────────────────────
// Q3: What is the output?
// ─────────────────────────────────────────────
console.log('\nQ3: What is the output?');

const makeMultiplier = x => y => x * y;
const times3  = makeMultiplier(3);
const times5  = makeMultiplier(5);

console.log(times3(4));        // 12
console.log(times5(4));        // 20
console.log(makeMultiplier(2)(6)); // 12

// Each call to makeMultiplier creates a NEW closure
// times3 and times5 are completely independent functions


// ─────────────────────────────────────────────
// Q4: Implement curry() from scratch
// ─────────────────────────────────────────────
console.log('\nQ4: curry() implementation');

// Already shown in Section 3 — key points to explain:
// 1. func.length gives declared parameter count
// 2. ...args collects all args so far
// 3. If enough args → call func
// 4. If not enough → return function that merges old + new args

function myCurry(func) {
    return function curriedFunc(...args) {
        if (args.length >= func.length) {
            return func(...args);
        }
        return function(...next) {
            return curriedFunc(...args, ...next);
        };
    };
}

const curriedAdd = myCurry((a, b, c) => a + b + c);
console.log(curriedAdd(1)(2)(3));   // 6
console.log(curriedAdd(1, 2)(3));   // 6
console.log(curriedAdd(1)(2, 3));   // 6


// ─────────────────────────────────────────────
// Q5: Why does curry() not work with rest params?
// ─────────────────────────────────────────────
console.log('\nQ5: curry() limitation with rest params');

const restFn = (...args) => args.reduce((a, b) => a + b, 0);
console.log(restFn.length); // 0 ← rest params don't count in .length!

const curriedRest = myCurry(restFn);
console.log(curriedRest());  // 0 — immediately calls with 0 args (0 >= 0)

// Fix: pass expected arity manually
function curryN(func, arity) {
    return function curriedFunc(...args) {
        if (args.length >= arity) return func(...args);
        return (...next) => curriedFunc(...args, ...next);
    };
}

const curriedRestFixed = curryN(restFn, 3);
console.log(curriedRestFixed(1)(2)(3)); // 6 ✓


// ─────────────────────────────────────────────
// Q6: Compose and curry together
// ─────────────────────────────────────────────
console.log('\nQ6: Compose + curry');

const pipe    = (...fns) => x => fns.reduce((v, f) => f(v), x);
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

const addOne  = x => x + 1;
const doubled = x => x * 2;
const square  = x => x * x;

const transform = pipe(addOne, doubled, square); // (x+1)*2, then squared
console.log(transform(3)); // ((3+1)*2)^2 = 64

// Curried functions compose naturally — each returns a unary function
const add5 = curry((a, b) => a + b)(5);
const mul3 = curry((a, b) => a * b)(3);

const process = pipe(add5, mul3, square);
console.log(process(2)); // ((2+5)*3)^2 = 441


// ─────────────────────────────────────────────
// Q7: Memoized curry — cache results per argument
// ─────────────────────────────────────────────
console.log('\nQ7: Memoized curry');

function memoizedCurry(func) {
    const cache = new Map();
    return function curriedFunc(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log(`cache hit for ${key}`);
            return cache.get(key);
        }
        const result = args.length >= func.length
            ? func(...args)
            : (...next) => curriedFunc(...args, ...next);
        cache.set(key, result);
        return result;
    };
}

const expensiveAdd = memoizedCurry((a, b, c) => {
    console.log('computing...');
    return a + b + c;
});

expensiveAdd(1)(2)(3); // computing...
expensiveAdd(1)(2)(3); // cache hit — skips computation
