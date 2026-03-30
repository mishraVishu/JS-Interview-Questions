# Lexical Scope in JavaScript

## What is Lexical Scope?

Lexical scope (also called static scope) means that the scope of a variable is determined by **where it is written in the source code**, not where it is called from at runtime. When a function is defined, it "remembers" the environment (variables) around it at the time of definition.

In simple terms: **a function can access variables from its own scope and any outer scope that wraps it.**

---

## How It Works

JavaScript uses a scope chain. When a variable is referenced, the engine:
1. Looks in the current (innermost) scope.
2. If not found, moves up to the enclosing scope.
3. Continues until it reaches the global scope.
4. If still not found, throws a `ReferenceError`.

---

## Examples

### Example 1: Basic Lexical Scope

```js
const name = "Alice"; // global scope

function greet() {
  console.log(name); // accesses 'name' from the outer (global) scope
}

greet(); // Output: Alice
```

`greet` can access `name` because it was defined in the same scope where `name` lives.

---

### Example 2: Nested Functions

```js
function outer() {
  const city = "New York";

  function inner() {
    const country = "USA";
    console.log(city);    // "New York" — from outer scope
    console.log(country); // "USA" — from own scope
  }

  inner();
  // console.log(country); // ReferenceError: country is not defined
}

outer();
```

`inner` has access to `city` (outer scope), but `outer` cannot access `country` (inner scope). Scope flows **inward, not outward**.

---

### Example 3: Lexical Scope vs Call Site

```js
const lang = "JavaScript";

function showLang() {
  console.log(lang); // uses where it was DEFINED, not where it is called
}

function run() {
  const lang = "Python"; // does NOT affect showLang
  showLang();
}

run(); // Output: JavaScript
```

Even though `run` has its own `lang`, `showLang` still uses the `lang` from where it was lexically defined (global scope).

---

### Example 4: Closures (Lexical Scope in Action)

```js
function makeCounter() {
  let count = 0; // lexically scoped to makeCounter

  return function () {
    count++;
    console.log(count);
  };
}

const counter = makeCounter();
counter(); // 1
counter(); // 2
counter(); // 3
```

The returned function closes over `count` from its lexical environment. This is the foundation of **closures**.

---

### Example 5: Block Scope with `let` and `const`

```js
function example() {
  if (true) {
    let blockVar = "I am block scoped";
    const blockConst = "Me too";
    console.log(blockVar);   // "I am block scoped"
    console.log(blockConst); // "Me too"
  }

  // console.log(blockVar);  // ReferenceError
  // console.log(blockConst); // ReferenceError
}

example();
```

`let` and `const` are block-scoped, meaning they are lexically bound to the nearest enclosing `{}` block.

---

## Key Takeaways

| Concept | Description |
|---|---|
| Lexical scope | Scope is determined at write time, not runtime |
| Scope chain | Inner scopes can access outer scopes, not vice versa |
| Closures | Functions retain access to their lexical scope even after the outer function returns |
| `var` | Function-scoped |
| `let` / `const` | Block-scoped |
