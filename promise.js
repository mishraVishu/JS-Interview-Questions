// ============================================================
// PROMISES IN JAVASCRIPT — Senior Dev Reference (5+ yrs)
// ============================================================
// A Promise is an object representing the eventual completion
// or failure of an async operation.
// States: pending → fulfilled | rejected  (one-way, irreversible)


// ============================================================
// SECTION 1: WHY PROMISES — CALLBACK HELL
// ============================================================

console.log('--- Callback Hell vs Promises ---');

// BEFORE — callback hell (pyramid of doom)
// getData((err, data1) => {
//     if (err) return console.error(err);
//     processData(data1, (err, data2) => {
//         if (err) return console.error(err);
//         saveData(data2, (err, result) => {
//             if (err) return console.error(err);
//             console.log(result);  // deeply nested ✗
//         });
//     });
// });

// AFTER — promise chaining (flat, readable)
// getData()
//     .then(data => processData(data))
//     .then(data => saveData(data))
//     .then(result => console.log(result))
//     .catch(err => console.error(err));  // one error handler ✓


// ============================================================
// SECTION 2: CREATING A PROMISE
// ============================================================

console.log('\n--- Creating Promises ---');

const myPromise = new Promise((resolve, reject) => {
    // executor runs SYNCHRONOUSLY
    setTimeout(() => {
        const success = true;
        if (success) resolve('Data loaded!');
        else reject(new Error('Failed to load'));
    }, 100);
});

myPromise
    .then(result => console.log('resolved:', result))
    .catch(err => console.error('rejected:', err.message))
    .finally(() => console.log('finally: runs regardless'));

// Promise.resolve / Promise.reject — create already-settled promises
const resolved = Promise.resolve(42);
const rejected = Promise.reject(new Error('oops'));

resolved.then(v => console.log('immediate resolve:', v));
rejected.catch(e => console.log('immediate reject:', e.message));


// ============================================================
// SECTION 3: PROMISE CHAINING
// ============================================================

console.log('\n--- Promise Chaining ---');

// Each .then returns a NEW promise — enables chaining
// Returning a value wraps it in Promise.resolve()
// Returning a promise waits for it to settle

Promise.resolve(1)
    .then(v => v + 1)       // returns 2
    .then(v => v * 3)       // returns 6
    .then(v => console.log('chain result:', v)); // 6

// KEY RULE: .catch recovers — chain continues after it
Promise.reject('error')
    .catch(e => {
        console.log('caught:', e);
        return 'recovered';          // returns value → next .then runs
    })
    .then(v => console.log('after catch:', v)); // 'recovered'


// ============================================================
// SECTION 4: PROMISE COMBINATORS
// ============================================================

console.log('\n--- Promise Combinators ---');

const p1 = Promise.resolve('First');
const p2 = Promise.resolve('Second');
const p3 = Promise.resolve('Third');

// Promise.all — all must resolve; fails fast on first rejection
// Use when: tasks are independent and ALL results are needed
Promise.all([p1, p2, p3])
    .then(results => console.log('all:', results))  // ['First','Second','Third']
    .catch(err => console.error('one failed:', err));

// Promise.all with one rejection — entire thing rejects
Promise.all([Promise.resolve('ok'), Promise.reject('fail'), Promise.resolve('ok2')])
    .catch(err => console.log('all failed fast:', err)); // 'fail'

// Promise.allSettled — waits for ALL to settle (never rejects)
// Use when: you need results of ALL promises regardless of success/failure
Promise.allSettled([Promise.resolve('ok'), Promise.reject('fail')])
    .then(results => {
        results.forEach(r => console.log('allSettled:', r));
        // { status: 'fulfilled', value: 'ok' }
        // { status: 'rejected',  reason: 'fail' }
    });

// Promise.race — first to settle (resolve OR reject) wins
// Use when: timeout patterns, fastest response
const slow = new Promise(res => setTimeout(() => res('slow'), 500));
const fast = new Promise(res => setTimeout(() => res('fast'), 100));
Promise.race([slow, fast])
    .then(winner => console.log('race winner:', winner)); // 'fast'

// Promise.any — first to RESOLVE wins; ignores rejections
// Rejects only if ALL reject (AggregateError)
// Use when: trying multiple sources, need first success
Promise.any([Promise.reject('e1'), Promise.resolve('winner'), Promise.resolve('other')])
    .then(v => console.log('any:', v)); // 'winner'

Promise.any([Promise.reject('e1'), Promise.reject('e2')])
    .catch(e => console.log('any all failed:', e instanceof AggregateError)); // true

// Combinator comparison table:
// all()        → all resolve → array of results | any rejects → reject (fail fast)
// allSettled() → all settle  → array of outcomes | never rejects
// race()       → first settles (resolve OR reject) wins
// any()        → first resolves wins | all reject → AggregateError


// ============================================================
// SECTION 5: ASYNC / AWAIT
// ============================================================

console.log('\n--- async/await ---');

// async function ALWAYS returns a Promise
// await pauses execution until Promise settles — only inside async

async function fetchUser() {
    return { name: 'Vaishali' }; // auto-wrapped in Promise.resolve()
}
fetchUser().then(u => console.log('async return:', u));

// Error handling with try/catch
async function loadData() {
    try {
        const result = await Promise.resolve('data');
        console.log('await result:', result);
        await Promise.reject(new Error('something failed'));
    } catch (err) {
        console.log('async catch:', err.message);
    } finally {
        console.log('async finally');
    }
}
loadData();

// Sequential vs Parallel — critical performance difference
async function sequential() {
    const a = await Promise.resolve('a'); // waits for a
    const b = await Promise.resolve('b'); // then waits for b
    // total time = time(a) + time(b)
}

async function parallel() {
    const [a, b] = await Promise.all([
        Promise.resolve('a'),
        Promise.resolve('b'),
    ]);
    // total time = max(time(a), time(b))  ← much faster
    console.log('parallel:', a, b);
}
parallel();


// ============================================================
// SECTION 6: ERROR HANDLING PATTERNS
// ============================================================

console.log('\n--- Error Handling ---');

// Pattern 1: .catch at end of chain
// fetch('/api/data')
//     .then(res => res.json())
//     .then(data => process(data))
//     .catch(err => console.error(err)); // catches ANY error in chain

// Pattern 2: try/catch with async/await (preferred)
// async function load() {
//     try {
//         const res  = await fetch('/api/data');
//         const data = await res.json();
//         return process(data);
//     } catch (err) {
//         console.error(err);
//     }
// }

// Pattern 3: return vs throw — important distinction
Promise.resolve('ok')
    .then(() => new Error('test'))   // returning Error — treated as VALUE
    .then(v  => console.log('returned error is a value:', v.message)) // 'test' ✓

Promise.resolve('ok')
    .then(() => { throw new Error('test'); }) // throwing → goes to catch
    .catch(e => console.log('thrown error caught:', e.message));      // 'test' ✓

// Pattern 4: unhandled promise rejection — always add .catch
// Node.js:   process.on('unhandledRejection', handler)
// Browser:   window.addEventListener('unhandledrejection', handler)
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled rejection:', event.reason);
});


// ============================================================
// SECTION 7: PROMISE ANTI-PATTERNS
// ============================================================

console.log('\n--- Anti-patterns ---');

// Anti-pattern 1: Promise constructor anti-pattern (wrapping a promise in a promise)
// ✗ Wrong
// function getUser() {
//     return new Promise((resolve, reject) => {
//         fetch('/user').then(res => resolve(res)); // unnecessary wrapping
//     });
// }
// ✓ Correct — just return the promise directly
// function getUser() {
//     return fetch('/user');
// }

// Anti-pattern 2: Forgetting to return in .then
Promise.resolve(1)
    .then(v => { v + 1; })   // ✗ forgot return — next .then gets undefined
    .then(v => console.log('forgot return:', v)); // undefined

Promise.resolve(1)
    .then(v => v + 1)        // ✓ implicit return
    .then(v => console.log('with return:', v));   // 2

// Anti-pattern 3: await in a loop — sequential instead of parallel
// ✗ Slow — each waits for previous
// for (const id of ids) {
//     const user = await fetchUser(id); // sequential
// }
// ✓ Fast — all fire at once
// const users = await Promise.all(ids.map(id => fetchUser(id)));


// ============================================================
// SECTION 8: INTERVIEW QUESTIONS
// ============================================================

console.log('\n\n=== INTERVIEW QUESTIONS ===\n');

// ─────────────────────────────────────────────
// Q1: What is the output?
// ─────────────────────────────────────────────
console.log('Q1: Sync vs async execution');

console.log('start');
const promise1 = new Promise((resolve) => {
    console.log(1);    // executor runs SYNCHRONOUSLY
    resolve(2);
});
promise1.then(res => console.log(res)); // microtask — runs after sync
console.log('end');
// Output: start → 1 → end → 2


// ─────────────────────────────────────────────
// Q2: What is the output? (code after resolve still runs)
// ─────────────────────────────────────────────
console.log('\nQ2: Code after resolve still runs');

new Promise((resolve) => {
    console.log('A');
    resolve('B');
    console.log('C');  // still runs — resolve doesn't stop execution
}).then(v => console.log(v));
console.log('D');
// Output: A → C → D → B


// ─────────────────────────────────────────────
// Q3: What is the output? (.catch recovers, chain continues)
// ─────────────────────────────────────────────
console.log('\nQ3: catch recovery');

Promise.reject()
    .then(() => console.log('Success 1'))  // skipped
    .then(() => console.log('Success 2'))  // skipped
    .catch(() => console.log('Error 1'))   // runs — catches rejection
    .then(() => console.log('Success 3')); // runs — catch returned undefined (resolved)
// Output: Error 1 → Success 3


// ─────────────────────────────────────────────
// Q4: return vs throw inside .then
// ─────────────────────────────────────────────
console.log('\nQ4: return Error vs throw Error');

Promise.resolve('start')
    .then(() => new Error('returned'))     // returned → value, goes to .then
    .then(v  => console.log('then got:', v.message))   // 'returned'
    .catch(e => console.log('catch got:', e.message));

Promise.resolve('start')
    .then(() => { throw new Error('thrown'); }) // thrown → goes to .catch
    .then(v  => console.log('then got:', v))    // skipped
    .catch(e => console.log('catch got:', e.message));  // 'thrown'


// ─────────────────────────────────────────────
// Q5: Promise chaining — nested promise resolves automatically
// ─────────────────────────────────────────────
console.log('\nQ5: Nested promise in chain');

const first  = Promise.resolve('First!');
const second = Promise.resolve(first); // passing a promise to resolve()

second
    .then(res => res)
    .then(res => console.log('nested resolve:', res)); // 'First!' — auto-unwrapped


// ─────────────────────────────────────────────
// Q6: Rewrite .then/.catch using async/await
// ─────────────────────────────────────────────
console.log('\nQ6: async/await rewrite');

// .then version
// function loadJson(url) {
//     return fetch(url).then(res => {
//         if (res.status === 200) return res.json();
//         throw new Error(res.status);
//     });
// }

// async/await version
async function loadJson(url) {
    try {
        const res = await fetch(url);
        if (res.status === 200) return await res.json();
        throw new Error(res.status);
    } catch (err) {
        console.log('loadJson error:', err.message);
    }
}


// ─────────────────────────────────────────────
// Q7: Execute promises recursively
// ─────────────────────────────────────────────
console.log('\nQ7: Recursive promise execution');

function promRecurse(promises){
    if(promises.length === 0) return;
    const [current, ...rest] = promises;
    current.then((res) => console.log('promRecurse result:', res))
            .catch((err) => console.log('promRecurse error:', err))
            .finally(() => promRecurse(rest));
}

// Wrapped in setTimeout so all three fire together at the bottom
// without being mixed in with earlier microtasks from the rest of the file
setTimeout(() => {
    promRecurse([Promise.resolve('one'), Promise.resolve('two'), Promise.resolve('three')]);
}, 0);


// ─────────────────────────────────────────────
// Q8: Promise timeout pattern
// ─────────────────────────────────────────────
console.log('\nQ8: Promise timeout');

function withTimeout(promise, ms) {
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms)
    );
    return Promise.race([promise, timeout]);
}

const slowTask = new Promise(res => setTimeout(() => res('done'), 2000));
withTimeout(slowTask, 500)
    .then(v => console.log('timeout result:', v))
    .catch(e => console.log('timeout caught:', e.message)); // Timed out after 500ms


// ─────────────────────────────────────────────
// Q9: Run promises with concurrency limit
// ─────────────────────────────────────────────
console.log('\nQ9: Concurrency limit');

/**
 * @param {Function[]} tasks - An array of functions returning promises.
 * @param {number} maxConcurrent - Max number of tasks to run in parallel.
 * @return {Promise<Array>} Resolves to an array of results in task order.
 */
async function scheduleTasks(tasks, maxConcurrent) {
  // implement here

  let results = [];
  let currentIndex = 0;

  if (tasks.length === 0) return Promise.resolve(results);

  async function worker() {
    while (currentIndex < tasks.length) {
      const index = currentIndex;
      currentIndex++;

      results[index] = await tasks[index]();
   }
  }

  const workers = [];
  for (let i = 0; i < maxConcurrent; i++){
    workers.push(worker());
  }

  await Promise.all(workers);
  return results;
}


// ─────────────────────────────────────────────
// Q10: Promise Polyfill (basic + improved)
// ─────────────────────────────────────────────
console.log('\nQ10: Promise Polyfill');

// Basic — single handler, synchronous
function PromisePolyfill(executor) {
    let onResolve, onReject;
    let isFulfilled = false, isRejected = false;
    let value, error;

    function resolve(val) {
        isFulfilled = true;
        value = val;
        if (typeof onResolve === 'function') onResolve(val);
    }

    function reject(err) {
        isRejected = true;
        error = err;
        if (typeof onReject === 'function') onReject(err);
    }

    this.then = function(callback) {
        onResolve = callback;
        if (isFulfilled) onResolve(value);
        return this;
    };

    this.catch = function(callback) {
        onReject = callback;
        if (isRejected) onReject(error);
        return this;
    };

    try { executor(resolve, reject); }
    catch (err) { reject(err); }
}

const basicP = new PromisePolyfill((resolve) => setTimeout(() => resolve(42), 100));
basicP.then(v => console.log('polyfill basic:', v));

// Improved — chainable, async callbacks, multiple handlers
function PromisePolyfillImproved(executor) {
    let state = 'pending';
    let value;
    let handlers = [];

    function resolve(val) {
        if (state !== 'pending') return; // settled promises are immutable
        state = 'fulfilled';
        value = val;
        setTimeout(() => handlers.forEach(handle), 0); // async — matches spec
    }

    function reject(err) {
        if (state !== 'pending') return;
        state = 'rejected';
        value = err;
        setTimeout(() => handlers.forEach(handle), 0);
    }

    function handle(handler) {
        if (state === 'pending') { handlers.push(handler); return; }
        if (state === 'fulfilled') {
            if (!handler.onFulfilled) { handler.resolve(value); return; }
            try { handler.resolve(handler.onFulfilled(value)); }
            catch (err) { handler.reject(err); }
        } else {
            if (!handler.onRejected) { handler.reject(value); return; }
            try { handler.resolve(handler.onRejected(value)); }
            catch (err) { handler.reject(err); }
        }
    }

    this.then = function(onFulfilled, onRejected) {
        return new PromisePolyfillImproved((resolve, reject) => {
            handle({ onFulfilled, onRejected, resolve, reject });
        });
    };

    this.catch = function(onRejected) { return this.then(undefined, onRejected); };
    this.finally = function(cb) {
        return this.then(
            v  => { cb(); return v; },
            e  => { cb(); throw e; }
        );
    };

    try { executor(resolve, reject); }
    catch (err) { reject(err); }
}

new PromisePolyfillImproved((resolve) => setTimeout(() => resolve('Step 1'), 100))
    .then(res => { console.log('improved:', res); return 'Step 2'; })
    .then(res => { console.log('improved:', res); throw new Error('oops'); })
    .catch(err => { console.log('improved catch:', err.message); return 'Recovered'; })
    .then(res => console.log('improved:', res))
    .finally(() => console.log('improved finally'));


// ============================================================
// SECTION 9: MICROTASK vs MACROTASK QUEUE — most asked interview topic
// ============================================================

console.log('\n--- Microtask vs Macrotask ---');

// Execution order:
// 1. Synchronous code       (call stack)
// 2. Microtasks             (Promise .then, queueMicrotask, MutationObserver)
// 3. Macrotasks             (setTimeout, setInterval, setImmediate, I/O)

// After EACH macrotask — ALL pending microtasks drain first before next macrotask

console.log('1 - sync');

setTimeout(() => console.log('2 - macrotask (setTimeout)'), 0);

Promise.resolve()
    .then(() => console.log('3 - microtask 1'))
    .then(() => console.log('4 - microtask 2')); // queued after microtask 1 resolves

queueMicrotask(() => console.log('5 - microtask 3 (queueMicrotask)'));

console.log('6 - sync');

// Output order:
// 1 - sync
// 6 - sync
// 3 - microtask 1      ← all microtasks drain before macrotask
// 5 - microtask 3
// 4 - microtask 2
// 2 - macrotask        ← setTimeout runs last

// KEY: setTimeout(..., 0) does NOT mean "run immediately"
// It means "run after current sync + ALL microtasks complete"

// Microtask starvation — infinite microtasks block the event loop
// function infinite() {
//     Promise.resolve().then(infinite); // ✗ never lets macrotasks run
// }


// ============================================================
// SECTION 10: THENABLE OBJECTS
// ============================================================

console.log('\n--- Thenable Objects ---');

// A "thenable" is any object with a .then() method
// Promise.resolve() treats thenables as promises — unwraps them

const thenable = {
    then(resolve, reject) {
        resolve('I am a thenable!');
    }
};

Promise.resolve(thenable)
    .then(v => console.log('thenable:', v)); // 'I am a thenable!'

// Real world: jQuery's $.ajax() returns a thenable (not a real Promise)
// Promise.resolve($.ajax('/url')).then(...) — works because it's a thenable

// Promise.resolve(promise) returns the SAME promise — no wrapping
const p = Promise.resolve(42);
console.log('same reference:', Promise.resolve(p) === p); // true


// ============================================================
// SECTION 11: PROMISE CANCELLATION — AbortController
// ============================================================

console.log('\n--- Promise Cancellation ---');

// Promises themselves are NOT cancellable — once created, they run to completion
// AbortController is the standard way to cancel async operations (fetch, etc.)

const controller = new AbortController();
const { signal } = controller;

// cancellable async task
function cancellableTask(signal){
    return new Promise((resolve,reject) => {
        signal.addEventListener('abort', () => {
            reject(new Error('Cancelled'))
        })

        if(!signal.aborted){
            setTimeout(() => {
                resolve('data');
            },1000)
        }
    })
}

const task = cancellableTask(signal);

task.then((v) => console.log('result:' , v))
    .catch(e => console.log(e.message));

setTimeout(() => controller.abort() ,2000);

// Real world fetch with AbortController:
// const controller2 = new AbortController();
// fetch('/api/data', { signal: controller2.signal })
//     .then(res => res.json())
//     .catch(err => {
//         if (err.name === 'AbortError') console.log('fetch cancelled');
//     });
// setTimeout(() => controller.abort(), 3000); // cancel after 3s


// ============================================================
// SECTION 12: PromiseAll with Concurrency Limit
// ============================================================

function promiseAllWithConcurrencyLimit(functions,limit){
    if(functions.length === 0) return Promise.resolve([]);

    let results = [];
    let completed = 0;
    let currentIndex = 0;
    let concurrencyLimit = Math.min(limit, functions.length);

    return new Promise((resolve, reject) => {
        function runNext() {
            while (currentIndex < functions.length){
                const index = currentIndex;
                currentIndex++;

                Promise.resolve(functions[index]())
                    .then((res) => {
                        results[index] = res;
                        completed++;

                        if(completed === functions.length){
                            resolve(results);
                        }else{
                            runNext();
                        }
                    })
                    .catch((err) => {
                        reject(err)
                    })
            }
        }

        for(let i =0; i< concurrencyLimit; i++){
            runNext();
        }
    })

}

const functions = [
    () => new Promise(res => setTimeout(() => res(1), 300)),  // slow
    () => new Promise(res => setTimeout(() => res(2), 100)),  // fast
    () => new Promise(res => setTimeout(() => res(3), 200)),  // medium
    () => new Promise(res => setTimeout(() => res(4), 400)),  // slowest
];

promiseAllWithConcurrencyLimit(functions, 2)
    .then(res => console.log(res));   // [1, 2, 3, 4]


// ============================================================
// SECTION 13: fetchWithRetry
// ============================================================
// Retries a failed async operation up to `retries` times
// before giving up and rejecting.
// Real world: unstable network, flaky APIs, rate limits

console.log('\n--- fetchWithRetry ---');

// ─────────────────────────────────────────────
// Basic Version — fixed delay between retries
// ─────────────────────────────────────────────
function fetchWithRetry(fn, retries = 3, delay = 1000) {
    return new Promise((resolve,reject) => {
        function attempt(triesLeft){
            fn().then(res => {
                resolve(res);
                return;
            }).catch((err) => {
                if(triesLeft <=1){
                    reject(new Error(err));
                    return;
                }
                console.log('Attempting retry. No of retries left', triesLeft-1);
                setTimeout(() => attempt(triesLeft-1),delay)
            })
        }
        attempt(retries);
    })
}

// Example — flaky API: fails twice, succeeds on 3rd call
let callCount = 0;
function flakyApi() {
    return new Promise((resolve, reject) => {
        callCount++;
        console.log(`  API call attempt #${callCount}`);
        if (callCount < 3) reject(new Error(`Network error on attempt ${callCount}`));
        else resolve({ data: 'Success!', attempt: callCount });
    });
}

console.log('\nExample 1 — success after retries:');
fetchWithRetry(flakyApi, 3, 200)
    .then(res => console.log('  Result:', res))
    .catch(err => console.log('  Failed:', err.message));

// Example — all retries exhausted
console.log('Example 2 — all retries exhausted:');
fetchWithRetry(() => Promise.reject(new Error('Server down')), 3, 100)
    .then(res => console.log('  Result:', res))
    .catch(err => console.log('  Failed after all retries:', err.message));


// ─────────────────────────────────────────────
// Improved Version — exponential backoff + jitter
// Each retry waits longer: 1s → 2s → 4s → 8s...
// Jitter adds randomness to avoid thundering herd
// ─────────────────────────────────────────────
function fetchWithRetryExponential(fn, retries = 3, baseDelay = 1000) {
    return new Promise((resolve, reject) => {
        function attempt(triesLeft, attemptNumber) {
            fn()
                .then(resolve)
                .catch((err) => {
                    if (triesLeft <= 1) {
                        reject(err);
                        return;
                    }
                    // exponential backoff: baseDelay * 2^attemptNumber
                    const waitTime = baseDelay * Math.pow(2, attemptNumber);
                    // jitter: add random ms to spread retries
                    const jitter = Math.random() * 200;
                    const totalWait = waitTime + jitter;

                    console.log(`  Retry ${attemptNumber + 1} in ${Math.round(totalWait)}ms...`);
                    setTimeout(() => attempt(triesLeft - 1, attemptNumber + 1), totalWait);
                });
        }
        attempt(retries, 0);
    });
}

// Example — exponential backoff with a flaky API
let expCallCount = 0;
console.log('\nExample 3 — exponential backoff:');
fetchWithRetryExponential(() => {
    expCallCount++;
    console.log(`  Exponential attempt #${expCallCount}`);
    return expCallCount < 3
        ? Promise.reject(new Error('Flaky!'))
        : Promise.resolve('Exponential success!');
}, 3, 100)
    .then(res => console.log('  Result:', res))
    .catch(err => console.log('  Failed:', err.message));


// ─────────────────────────────────────────────
// async/await Version — cleaner syntax
// ─────────────────────────────────────────────
async function fetchWithRetryAsync(fn, retries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const result = await fn();
            return result;                  // success → return immediately
        } catch (err) {
            if (attempt === retries) throw err; // last attempt → throw
            console.log(`  Attempt ${attempt} failed. Retrying in ${delay}ms...`);
            await new Promise(res => setTimeout(res, delay)); // wait before retry
        }
    }
}

// Example — async/await version with flaky API
let asyncCallCount = 0;
console.log('\nExample 4 — async/await version:');
fetchWithRetryAsync(() => {
    asyncCallCount++;
    console.log(`  Async attempt #${asyncCallCount}`);
    return asyncCallCount < 2
        ? Promise.reject(new Error(`Fail ${asyncCallCount}`))
        : Promise.resolve('Async success!');
}, 3, 100)
    .then(res => console.log('  Async result:', res))
    .catch(err => console.log('  Async failed:', err.message));



