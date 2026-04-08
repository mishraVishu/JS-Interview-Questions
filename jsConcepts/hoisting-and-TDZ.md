# Hoisting and Temporal Dead Zone (TDZ) in JavaScript

---

## What is Hoisting?

Hoisting is JavaScript's behavior of moving **declarations** to the top of their scope before code execution. Only the **declaration** is hoisted, not the **initialization**.

---

## Hoisting with `var`

```js
console.log(x); // undefined (not an error)
var x = 5;
console.log(x); // 5
```

Internally JavaScript sees it as:
```js
var x;           // declaration hoisted to top
console.log(x);  // undefined
x = 5;           // initialization stays in place
console.log(x);  // 5
```

---

## Hoisting with `let` and `const`

```js
console.log(y); // ❌ ReferenceError: Cannot access 'y' before initialization
let y = 10;
```

`let` and `const` **are hoisted** but are **not initialized** — they sit in the TDZ until the declaration line is reached.

---

## Hoisting with Functions

### Function Declarations — fully hoisted
```js
greet(); // ✅ "Hello!" — works fine

function greet() {
    console.log("Hello!");
}
```

### Function Expressions — NOT fully hoisted
```js
sayHi(); // ❌ TypeError: sayHi is not a function

var sayHi = function () {
    console.log("Hi!");
};
```

`var sayHi` is hoisted as `undefined`, so calling it before the assignment throws a `TypeError`.

### Arrow Functions — same as function expressions
```js
greet(); // ❌ TypeError: greet is not a function

var greet = () => console.log("Hello!");
```

---

## Hoisting Summary Table

| Type | Hoisted? | Initialized? | Usable before declaration? |
|---|---|---|---|
| `var` | ✅ | ✅ as `undefined` | ✅ (value is `undefined`) |
| `let` | ✅ | ❌ (TDZ) | ❌ ReferenceError |
| `const` | ✅ | ❌ (TDZ) | ❌ ReferenceError |
| Function declaration | ✅ | ✅ fully | ✅ |
| Function expression (`var`) | ✅ | ❌ (undefined) | ❌ TypeError |
| Arrow function (`var`) | ✅ | ❌ (undefined) | ❌ TypeError |

---

## What is TDZ (Temporal Dead Zone)?

The **TDZ** is the period between the **start of a block scope** and the point where a `let` or `const` variable is **declared and initialized**. Accessing the variable during this period throws a `ReferenceError`.

```js
{
    // TDZ for 'a' starts here
    console.log(a); // ❌ ReferenceError
    let a = 5;      // TDZ ends here
    console.log(a); // ✅ 5
}
```

---

## TDZ Examples

### Example 1 — Basic TDZ
```js
console.log(name); // ❌ ReferenceError
let name = "Alice";
console.log(name); // ✅ "Alice"
```

### Example 2 — `var` has no TDZ
```js
console.log(age); // ✅ undefined (no TDZ for var)
var age = 25;
console.log(age); // ✅ 25
```

### Example 3 — TDZ inside a function
```js
function greet() {
    console.log(msg); // ❌ ReferenceError — TDZ
    let msg = "Hello";
    console.log(msg); // ✅ "Hello"
}
greet();
```

### Example 4 — TDZ with `const`
```js
console.log(PI); // ❌ ReferenceError — TDZ
const PI = 3.14;
console.log(PI); // ✅ 3.14
```

### Example 5 — Tricky: `var` vs `let` in same scope
```js
console.log(a); // ✅ undefined
console.log(b); // ❌ ReferenceError

var a = 1;
let b = 2;
```

---

## Why Does TDZ Exist?

TDZ is intentional — it prevents bugs caused by using variables before they are properly set up. It enforces a cleaner, more predictable coding style.

```js
// With var — silent bug
console.log(score); // undefined (no error, hard to catch)
var score = 100;

// With let — caught immediately
console.log(score); // ❌ ReferenceError (fail fast, easier to debug)
let score = 100;
```

---

## Tricky Interview Question — Block-Scoped Function Declaration

### Guess the output:

```js
function outer() {
  console.log(typeof fn);

  {
    function fn() { return 1; }
  }

  console.log(typeof fn);
}

outer();
```

### Output (non-strict mode):
```
undefined
function
```

### Reasoning:

In **non-strict mode**, block-level function declarations have a special two-phase hoisting behavior:

**Phase 1 — Before execution:**
The name `fn` is hoisted to the enclosing **function scope** (`outer`), but initialized as `undefined` (not as the function). So the first `console.log(typeof fn)` prints `"undefined"`.

**Phase 2 — When the block executes:**
The function declaration inside `{}` runs. JavaScript then **copies the block-scoped `fn` value up** to the function-scope `fn`. So after the block, `fn` in `outer`'s scope becomes the actual function. The second `console.log(typeof fn)` prints `"function"`.

**In strict mode (`"use strict"`):**
```js
"use strict";
function outer() {
  console.log(typeof fn); // undefined
  {
    function fn() { return 1; }
  }
  console.log(typeof fn); // undefined ← fn is block-scoped, not visible outside {}
}
outer();
```
In strict mode, `fn` is **fully block-scoped** and not accessible outside the `{}`, so both logs print `"undefined"`.

### Key insight:
Block-level function declarations in non-strict mode are a legacy quirk — the name is hoisted as `undefined` to the function scope, and the value is only promoted after the block runs. This is why `let`/`const` and strict mode are preferred to avoid this confusing behavior.

---

## Key Takeaways

- **Hoisting** moves declarations to the top of scope at compile time, not the assignments.
- `var` is hoisted and initialized as `undefined` — no TDZ.
- `let` and `const` are hoisted but **not initialized** — they have a TDZ.
- **Function declarations** are fully hoisted (both declaration and body).
- **Function expressions and arrow functions** follow the rules of their variable keyword (`var`, `let`, `const`).
- Accessing a `let`/`const` variable in the TDZ throws a `ReferenceError`.
