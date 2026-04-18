// ============================================================
// DEBOUNCE & THROTTLE — Senior Dev Reference (5+ yrs)
// ============================================================
// Debounce: delays execution until AFTER N ms of inactivity.
//           Resets the timer on every new call. Fires ONCE after the storm ends.
//
// Throttle: ensures a function fires at most ONCE per N ms.
//           Ignores calls that arrive too soon. Fires at a STEADY rate.
//
// Mental model:
//   Debounce = "Wait until things calm down, THEN act"
//   Throttle = "Act, but max once every N ms — no matter how many calls come in"
//
// ┌──────────────┬─────────────────────────────┬──────────────────────────────┐
// │              │ Debounce                    │ Throttle                     │
// ├──────────────┼─────────────────────────────┼──────────────────────────────┤
// │ When fires   │ After silence (last call)   │ At fixed intervals           │
// │ Use for      │ Search input, resize, forms │ Scroll, mousemove, API limit │
// │ Key property │ Resets on every call        │ Steady cadence               │
// └──────────────┴─────────────────────────────┴──────────────────────────────┘


// ============================================================
// SECTION 1: BASIC IMPLEMENTATIONS
// ============================================================

console.log('--- Basic Implementations ---');

// ─── Trailing-edge Debounce (most common) ───────────────────
// Fires the callback AFTER the user stops invoking for `delay` ms.

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// ─── Time-based Throttle ────────────────────────────────────
// Fires at most once every `delay` ms. Ignores all calls in between.

function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall < delay) return;
    lastCall = now;
    return fn.apply(this, args);
  };
}

// Quick demo (works in browser console)
const debouncedLog = debounce(v => console.log('debounce fired:', v), 300);
debouncedLog('a'); debouncedLog('ab'); debouncedLog('abc'); // only 'abc' fires

const throttledLog = throttle(v => console.log('throttle fired:', v), 500);
throttledLog(1); throttledLog(2); throttledLog(3); // only first fires immediately


// ============================================================
// SECTION 2: ADVANCED DEBOUNCE
// ============================================================

console.log('\n--- Advanced Debounce ---');

// ─── Leading-edge (immediate) Debounce ──────────────────────
// Fires IMMEDIATELY on the first call, then silences for `delay` ms.
// Use case: button click that should give instant feedback, but not spam.

function debounceLeading(fn, delay) {
  let timer;
  return function (...args) {
    const shouldFire = !timer;            // no pending timer → first call
    clearTimeout(timer);
    timer = setTimeout(() => { timer = null; }, delay);
    if (shouldFire) fn.apply(this, args); // fire on leading edge
  };
}

// ─── Debounce with cancel() and flush() ─────────────────────
// cancel() — abort the pending timer (e.g. on component unmount)
// flush()  — execute immediately without waiting for the timer to expire

function debounceWithControls(fn, delay) {
  let timer, lastArgs, lastCtx;

  function debounced(...args) {
    lastArgs = args;
    lastCtx  = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(lastCtx, lastArgs);
      timer = null;
    }, delay);
  }

  debounced.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };

  debounced.flush = function () {
    if (timer) {
      clearTimeout(timer);
      fn.apply(lastCtx, lastArgs);
      timer = null;
    }
  };

  return debounced;
}

const dSearch = debounceWithControls(q => console.log('Search:', q), 300);
dSearch('he');
dSearch('hel');
dSearch.cancel();  // abort — nothing fires
dSearch('hello');
dSearch.flush();   // fires 'hello' immediately without waiting 300ms

// ─── Async Debounce (stale-call cancellation) ────────────────
// Problem: even with debounce, if 2 async calls resolve out-of-order
// you can display stale results. Solution: sequence counter.

function debounceAsync(fn, delay) {
  let timer;
  let seq = 0;

  return async function (...args) {
    clearTimeout(timer);
    const current = ++seq;
    await new Promise(resolve => { timer = setTimeout(resolve, delay); });
    if (current !== seq) return; // stale — a newer call already fired
    return fn.apply(this, args);
  };
}


// ============================================================
// SECTION 3: ADVANCED THROTTLE
// ============================================================

console.log('\n--- Advanced Throttle ---');

// ─── Throttle with leading AND trailing edge ─────────────────
// Leading:  fires immediately on first call in a window
// Trailing: also fires once AFTER the last call in the window
// This matches lodash's default _.throttle() behavior.

function throttleFull(fn, delay) {
  let lastCall = 0;
  let timer    = null;

  return function (...args) {
    const now       = Date.now();
    const remaining = delay - (now - lastCall);

    if (remaining <= 0) {
      if (timer) { clearTimeout(timer); timer = null; }
      lastCall = now;
      fn.apply(this, args);             // leading edge
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {        // trailing edge
        lastCall = Date.now();
        timer    = null;
        fn.apply(this, args);
      }, remaining);
    }
  };
}

// ─── requestAnimationFrame Throttle ──────────────────────────
// Syncs execution with the browser's 60fps paint cycle.
// More precise than setTimeout(fn, 16) for visual/DOM updates.
// Automatically pauses when the tab is hidden — saves CPU.

function throttleRAF(fn) {
  let rafId = null;
  return function (...args) {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      fn.apply(this, args);
      rafId = null;
    });
  };
}


// ============================================================
// SECTION 4: PRACTICAL PATTERNS
// ============================================================

console.log('\n--- Practical Patterns ---');

// ─── Pattern 1: Button UI with debounce (DOM demo) ───────────
//
// const btn        = document.querySelector('.increment-btn');
// const btnPress   = document.querySelector('.increment_pressed');
// const countEl    = document.querySelector('.increment_count');
//
// let pressCount   = 0;
// let triggerCount = 0;
//
// const debounceCount = debounce(() => {
//   countEl.innerHTML = ++triggerCount;
// }, 800);
//
// btn.addEventListener('click', () => {
//   btnPress.innerHTML = ++pressCount; // updates every click
//   debounceCount();                   // increments only after 800ms silence
// });

// ─── Pattern 2: Search input with debounce ───────────────────
//
// const searchInput = document.querySelector('#search');
// const fetchResults = debounce(async (query) => {
//   const res  = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
//   const data = await res.json();
//   renderResults(data);
// }, 300);
// searchInput.addEventListener('input', e => fetchResults(e.target.value));

// ─── Pattern 3: Scroll event with throttle ───────────────────
//
// const handleScroll = throttle(() => {
//   updateProgressBar(window.scrollY);
// }, 100);
// window.addEventListener('scroll', handleScroll);

// ─── Pattern 4: React — cleanup to prevent memory leaks ──────
// CRITICAL: always cancel debounced fn on component unmount.
// Without cancel(), setState fires after unmount → React warning.
//
// useEffect(() => {
//   const search = debounceWithControls(fetchData, 300);
//   input.addEventListener('input', e => search(e.target.value));
//   return () => search.cancel(); // ← prevent setState on unmounted component
// }, []);


// ============================================================
// SECTION 5: INTERVIEW QUESTIONS — SENIOR LEVEL (5 yrs)
// ============================================================

console.log('\n\n=== INTERVIEW QUESTIONS ===\n');

// ─────────────────────────────────────────────
// Q1: Implement a debounce polyfill from scratch
// ─────────────────────────────────────────────
console.log('Q1: Debounce polyfill');

function myDebounce(cb, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => cb.apply(this, args), delay);
  };
}

const debouncedFn = myDebounce(val => console.log('fired:', val), 300);
debouncedFn('a'); debouncedFn('ab'); debouncedFn('abc'); // only 'abc' fires


// ─────────────────────────────────────────────
// Q2: Implement a throttle polyfill from scratch
// ─────────────────────────────────────────────
console.log('\nQ2: Throttle polyfill');

function myThrottle(cb, delay) {       // ← fix: was `d` (undefined), must be `delay`
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();            // ← fix: Date.now() not new Date().getTime()
    if (now - lastCall < delay) return;
    lastCall = now;
    return cb.apply(this, args);
  };
}

const throttledFn = myThrottle(val => console.log('throttle:', val), 500);
throttledFn(1); throttledFn(2); throttledFn(3); // only 1 fires immediately


// ─────────────────────────────────────────────
// Q3: What is the difference between debounce and throttle?
//     When would you use each?
// ─────────────────────────────────────────────
console.log('\nQ3: Debounce vs Throttle');

// Debounce → use when only the FINAL state matters, intermediate calls can be skipped
//   ✓ Search/autocomplete: want the query AFTER typing stops
//   ✓ Window resize: recalculate layout AFTER resize ends
//   ✓ Form validation, save draft: fire once user pauses

// Throttle → use when you want CONSISTENT updates at a steady rate
//   ✓ Scroll/mousemove: update header, parallax, drag position steadily
//   ✓ Rate-limiting API calls (e.g. analytics events)
//   ✓ Button spam guard: allow first click, ignore rapid repeats


// ─────────────────────────────────────────────
// Q4: Implement leading-edge debounce
// ─────────────────────────────────────────────
console.log('\nQ4: Leading-edge debounce');

function myDebounceLeading(fn, delay) {
  let timer;
  return function (...args) {
    const shouldFire = !timer;                              // true on first call
    clearTimeout(timer);
    timer = setTimeout(() => { timer = null; }, delay);    // open window after delay
    if (shouldFire) fn.apply(this, args);                  // fire immediately
  };
}

// Use: button that should respond instantly on first click but not on rapid re-clicks.
const saveBtn = myDebounceLeading(() => console.log('Saved!'), 1000);
saveBtn(); // fires immediately
saveBtn(); // ignored (within 1000ms)
saveBtn(); // ignored


// ─────────────────────────────────────────────
// Q5: Add cancel() and flush() to your debounce
// ─────────────────────────────────────────────
console.log('\nQ5: Debounce with cancel + flush');

function myDebounceWithControls(fn, delay) {
  let timer, lastArgs, lastCtx;

  function debounced(...args) {
    lastArgs = args;
    lastCtx  = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(lastCtx, lastArgs);
      timer = null;
    }, delay);
  }

  debounced.cancel = () => { clearTimeout(timer); timer = null; };
  debounced.flush  = () => { if (timer) { clearTimeout(timer); fn.apply(lastCtx, lastArgs); timer = null; } };

  return debounced;
}

const controlled = myDebounceWithControls(q => console.log('result:', q), 300);
controlled('hel');
controlled.flush(); // fires 'hel' immediately — don't wait for 300ms


// ─────────────────────────────────────────────
// Q6: Why does this debounce break `this` context?
//     How do you fix it?
// ─────────────────────────────────────────────
console.log('\nQ6: this context in debounce');

// BROKEN — arrow function in the outer return captures wrong `this`:
function debounceBroken(fn, delay) {
  let timer;
  return (...args) => {                        // ❌ arrow fn: `this` = outer scope (Window)
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// CORRECT — regular function preserves caller's `this`:
function debounceCorrect(fn, delay) {
  let timer;
  return function (...args) {                  // ✓ regular fn: `this` = caller's context
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const obj = {
  multiplier: 3,
  compute: debounceCorrect(function (x) {
    console.log(x * this.multiplier); // `this` correctly refers to obj
  }, 100)
};
obj.compute(5); // logs 15 after 100ms


// ─────────────────────────────────────────────
// Q7: Why does naive debounce fail for async functions?
//     How do you handle out-of-order responses?
// ─────────────────────────────────────────────
console.log('\nQ7: Async debounce + race condition');

// Problem: user types "he" → "hel" → "hell" → "hello"
// Debounce fires only for "hello". But if async calls fire anyway
// and "hel" resolves AFTER "hello" → stale results displayed.
//
// Fix: sequence counter — discard any response that isn't the latest.

function myDebounceAsync(fn, delay) {
  let timer;
  let seq = 0;

  return async function (...args) {
    clearTimeout(timer);
    const current = ++seq;
    await new Promise(resolve => { timer = setTimeout(resolve, delay); });
    if (current !== seq) return;          // stale call — a newer one came in
    return fn.apply(this, args);
  };
}

// Alternative (AbortController approach):
// Cancel the actual fetch on each new keystroke using AbortController.signal


// ─────────────────────────────────────────────
// Q8: Implement throttle with both leading and trailing edges
// ─────────────────────────────────────────────
console.log('\nQ8: Full throttle (leading + trailing)');

function myThrottleFull(fn, delay) {
  let lastCall = 0;
  let timer    = null;

  return function (...args) {
    const now       = Date.now();
    const remaining = delay - (now - lastCall);

    if (remaining <= 0) {
      if (timer) { clearTimeout(timer); timer = null; }
      lastCall = now;
      fn.apply(this, args);                          // leading: fire now
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {                     // trailing: fire after window
        lastCall = Date.now();
        timer    = null;
        fn.apply(this, args);
      }, remaining);
    }
  };
}

// Difference from basic throttle:
// Basic throttle — last call in a busy window is DROPPED
// Full throttle  — last call in a busy window fires at the END of the window


// ─────────────────────────────────────────────
// Q9: What is a requestAnimationFrame throttle?
//     Why is it better than setTimeout(fn, 16) for animations?
// ─────────────────────────────────────────────
console.log('\nQ9: RAF throttle');

function myThrottleRAF(fn) {
  let rafId = null;
  return function (...args) {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      fn.apply(this, args);
      rafId = null;
    });
  };
}

// Why RAF > setTimeout(fn, 16):
// 1. setTimeout(fn, 16) can drift — JS timer resolution is ~4ms minimum, may fire early/late.
// 2. RAF is guaranteed to fire exactly once per browser paint frame (~16.67ms at 60fps).
// 3. RAF is automatically paused when tab is hidden → CPU savings (setTimeout still fires).
// 4. RAF is synced with the display refresh → no tearing/jank.

const smoothScroll = myThrottleRAF(() => updateParallax(window.scrollY));
// window.addEventListener('scroll', smoothScroll);


// ─────────────────────────────────────────────
// Q10: How do you test a debounced function?
// ─────────────────────────────────────────────
console.log('\nQ10: Testing debounce with fake timers');

// With Jest/Vitest:
//
// jest.useFakeTimers();
// const fn       = jest.fn();
// const debounced = myDebounce(fn, 300);
//
// debounced('a');
// debounced('b');
// debounced('c');
// expect(fn).not.toHaveBeenCalled();    // timer hasn't fired yet
//
// jest.advanceTimersByTime(300);
// expect(fn).toHaveBeenCalledTimes(1);  // only ONE call despite 3 rapid invocations
// expect(fn).toHaveBeenCalledWith('c'); // called with the LAST argument
//
// jest.useRealTimers(); // restore after test


// ─────────────────────────────────────────────
// Q11: How does lodash debounce differ from a naive implementation?
// ─────────────────────────────────────────────
console.log('\nQ11: Lodash debounce vs naive');

// Lodash _.debounce adds on top of the naive version:
// 1. leading / trailing options (both can be enabled simultaneously)
// 2. maxWait — ensures fn fires at least once every maxWait ms even if calls keep coming
//    (effectively makes a debounce behave like a throttle for sustained activity)
// 3. .cancel() and .flush() methods built in
// 4. Handles `this` correctly for both regular and method calls
// 5. Works with IE / older environments
//
// _.debounce(fn, 300, { leading: true, trailing: true, maxWait: 1000 })
//  → fires immediately on first call (leading),
//    fires again at most 1000ms later even if calls don't stop (maxWait),
//    and fires once more after silence (trailing).


// ─────────────────────────────────────────────
// Q12: Implement a simple rate limiter using throttle
// ─────────────────────────────────────────────
console.log('\nQ12: Rate limiter');

// Rate limiter: max N calls per time window (fixed-window counter)
function rateLimiter(fn, maxCalls, windowMs) {
  let calls = 0;
  let windowStart = Date.now();

  return function (...args) {
    const now = Date.now();

    if (now - windowStart >= windowMs) {
      calls       = 0;          // reset window
      windowStart = now;
    }

    if (calls >= maxCalls) {
      console.warn('Rate limit exceeded');
      return;
    }

    calls++;
    return fn.apply(this, args);
  };
}

const limitedApi = rateLimiter(data => console.log('API call:', data), 3, 1000);
limitedApi('req1'); // ✓
limitedApi('req2'); // ✓
limitedApi('req3'); // ✓
limitedApi('req4'); // ✗ "Rate limit exceeded"
