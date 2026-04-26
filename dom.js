// ============================================================
// JAVASCRIPT & DOM — Senior Dev Reference + Live Demo
// ============================================================
// Open DevTools console to see all output.
// Each section is wrapped in console.group for easy navigation.


// ============================================================
// SECTION 1: SELECTING ELEMENTS
// ============================================================
console.group('S1 · Selecting Elements');

const byId    = document.getElementById('app');
const byClass = document.getElementsByClassName('card'); // live HTMLCollection
const byTag   = document.getElementsByTagName('div');
const first   = document.querySelector('.card.active');
const all     = document.querySelectorAll('ul > li');    // static NodeList

console.log('getElementById         →', byId);
console.log('getElementsByClassName →', byClass, '(live, length:', byClass.length, ')');
console.log('getElementsByTagName   →', byTag, '(live, length:', byTag.length, ')');
console.log('querySelector .card.active →', first);
console.log('querySelectorAll ul>li →', all, '(static, length:', all.length, ')');

// Live vs static demo
const liveCards   = document.getElementsByClassName('card');   // live
const staticCards = document.querySelectorAll('.card');         // static snapshot
const newCard = document.createElement('div');
newCard.className = 'card';
newCard.textContent = 'Card 4 (added by JS)';
document.querySelector('section').appendChild(newCard); // append to first section

console.log('After adding a .card dynamically:');
console.log('  live   HTMLCollection length →', liveCards.length,   '(auto-updated)');
console.log('  static NodeList      length →', staticCards.length, '(frozen at query time)');

console.groupEnd();


// ============================================================
// SECTION 2: TRAVERSING THE DOM
// ============================================================
console.group('S2 · DOM Traversal');

const el = document.querySelector('#parent');

console.log('el (#parent)           →', el);
console.log('el.parentElement       →', el.parentElement);
console.log('el.children            →', el.children, '(element children only)');
console.log('el.childNodes          →', el.childNodes, '(includes text nodes)');
console.log('el.firstElementChild   →', el.firstElementChild);
console.log('el.lastElementChild    →', el.lastElementChild);
console.log('el.nextElementSibling  →', el.nextElementSibling);
console.log('el.closest("section")  →', el.closest('section'));

console.groupEnd();


// ============================================================
// SECTION 3: CREATING & INSERTING ELEMENTS
// ============================================================
console.group('S3 · Creating & Inserting');

document.querySelector('#insert-btn').addEventListener('click', () => {
  const container = document.querySelector('#insert-container');
  const ref       = document.querySelector('#reference');

  // createElement + createTextNode
  const newDiv = document.createElement('div');
  newDiv.textContent = '← created with createElement';
  newDiv.style.cssText = 'background:#d4edda;padding:0.3rem;border-radius:3px;margin:0.3rem 0;';

  // insertBefore — insert before #reference
  container.insertBefore(newDiv, ref);
  console.log('insertBefore: newDiv inserted before #reference');

  // insertAdjacentHTML — four positions
  ref.insertAdjacentHTML('beforebegin', '<p style="color:gray;margin:2px 0">beforebegin</p>');
  ref.insertAdjacentHTML('afterbegin',  '<b>afterbegin · </b>');
  ref.insertAdjacentHTML('beforeend',   ' · <b>beforeend</b>');
  ref.insertAdjacentHTML('afterend',    '<p style="color:gray;margin:2px 0">afterend</p>');
  console.log('insertAdjacentHTML: all 4 positions injected around #reference');
});

console.log('(Click "Run insertions" button to see DOM mutations)');
console.groupEnd();


// ============================================================
// SECTION 4: REMOVING & CLONING
// ============================================================
console.group('S4 · Removing & Cloning');

let cloneEl = null;

document.querySelector('#clone-btn').addEventListener('click', () => {
  const source  = document.querySelector('#clone-source');
  const target  = document.querySelector('#clone-target');

  const shallow = source.cloneNode(false); // element only, no children
  const deep    = source.cloneNode(true);  // element + all descendants

  shallow.style.cssText = 'background:#fff3cd;padding:0.4rem;border-radius:3px;margin:0.25rem 0;';
  deep.style.cssText    = 'background:#d4edda;padding:0.4rem;border-radius:3px;margin:0.25rem 0;';

  target.innerHTML = '';
  target.append(shallow, deep);
  cloneEl = deep;

  console.log('cloneNode(false) — shallow (no children):', shallow);
  console.log('cloneNode(true)  — deep (with children):', deep);
  console.log('Note: event listeners are NOT copied by cloneNode');
});

document.querySelector('#remove-btn').addEventListener('click', () => {
  if (cloneEl) {
    cloneEl.remove();
    console.log('cloneEl.remove() — deep clone removed from DOM');
    cloneEl = null;
  } else {
    console.log('Nothing to remove — clone first');
  }
});

console.groupEnd();


// ============================================================
// SECTION 5: READING & WRITING CONTENT
// ============================================================
console.group('S5 · Reading & Writing Content');

const contentEl   = document.querySelector('#content-demo');
const originalHTML = contentEl.innerHTML;

document.querySelector('#set-inner-html').addEventListener('click', () => {
  contentEl.innerHTML = '<b>Bold</b> via <em>innerHTML</em>';
  console.log('innerHTML set — HTML is parsed, tags rendered');
});

document.querySelector('#set-text-content').addEventListener('click', () => {
  contentEl.textContent = '<b>Not bold</b> — textContent treats this as raw text (safe!)';
  console.log('textContent set — no HTML parsing, XSS-safe');
});

document.querySelector('#set-inner-text').addEventListener('click', () => {
  contentEl.innerText = 'innerText: respects CSS visibility, triggers layout';
  console.log('innerText set — causes reflow, avoids hidden element text');
});

document.querySelector('#reset-content').addEventListener('click', () => {
  contentEl.innerHTML = originalHTML;
  console.log('Reset to original HTML');
});

// Read comparison on original element (before any button click)
const tempEl = document.createElement('div');
tempEl.innerHTML = 'Visible <span style="display:none">Hidden</span>';
console.log('textContent reads hidden text →', tempEl.textContent.trim());
console.log('innerText  skips hidden text  →', tempEl.innerText.trim());

console.groupEnd();


// ============================================================
// SECTION 6: ATTRIBUTES & PROPERTIES
// ============================================================
console.group('S6 · Attributes & Properties');

const demoInput = document.querySelector('#demo-input');
const demoBtn   = document.querySelector('#demo-btn');

// data-* / dataset
console.log('data-user-id via getAttribute →', demoInput.getAttribute('data-user-id'));
console.log('data-user-id via dataset      →', demoInput.dataset.userId);

// attribute vs property
console.log('value getAttribute (initial HTML) →', demoInput.getAttribute('value'));
console.log('value property (current)         →', demoInput.value);

document.querySelector('#enable-btn').addEventListener('click', () => {
  demoBtn.disabled = !demoBtn.disabled;
  console.log('button.disabled toggled →', demoBtn.disabled);
});

document.querySelector('#read-attr-btn').addEventListener('click', () => {
  console.log('--- Attribute vs Property ---');
  console.log('getAttribute("value")  →', demoInput.getAttribute('value'), '(HTML attribute — initial)');
  console.log('.value                 →', demoInput.value,                  '(DOM property — current)');
  console.log('getAttribute("disabled") →', demoBtn.getAttribute('disabled'));
  console.log('.disabled               →', demoBtn.disabled);
  // Set a custom data attribute
  demoInput.setAttribute('data-updated', Date.now());
  console.log('data-updated set via setAttribute →', demoInput.dataset.updated);
});

console.groupEnd();


// ============================================================
// SECTION 7: CLASS & STYLE MANIPULATION
// ============================================================
console.group('S7 · Class & Style');

const styleDemo = document.querySelector('#style-demo');

document.querySelector('#add-class-btn').addEventListener('click', () => {
  styleDemo.classList.add('active', 'visible');
  styleDemo.classList.remove('old');
  styleDemo.classList.replace('box', 'card');
  console.log('classList after add/remove/replace:', [...styleDemo.classList]);
  console.log('contains "active":', styleDemo.classList.contains('active'));
});

document.querySelector('#toggle-class-btn').addEventListener('click', () => {
  styleDemo.classList.toggle('open');
  console.log('classList after toggle:', [...styleDemo.classList]);
  styleDemo.style.backgroundColor = styleDemo.classList.contains('open') ? '#a5d6a7' : '#eee';
  styleDemo.style.transition = 'background-color 0.3s';
});

document.querySelector('#computed-btn').addEventListener('click', () => {
  const computed = getComputedStyle(styleDemo);
  console.log('getComputedStyle:');
  console.log('  font-size        →', computed.getPropertyValue('font-size'));
  console.log('  background-color →', computed.getPropertyValue('background-color'));
  console.log('  padding          →', computed.getPropertyValue('padding'));
  console.log('  (el.style only shows INLINE styles; getComputedStyle shows ALL applied styles)');
});

console.groupEnd();


// ============================================================
// SECTION 8: DIMENSIONS & POSITION
// ============================================================
console.group('S8 · Dimensions & Position');

const dimBox = document.querySelector('#dim-box');

document.querySelector('#dims-btn').addEventListener('click', () => {
  console.log('--- Dimensions ---');
  console.log('offsetWidth  (content+padding+border):', dimBox.offsetWidth);
  console.log('clientWidth  (content+padding)        :', dimBox.clientWidth);
  console.log('scrollWidth  (full incl. overflow)    :', dimBox.scrollWidth);
  console.log('offsetHeight :', dimBox.offsetHeight);
  console.log('clientHeight :', dimBox.clientHeight);
  console.log('scrollHeight :', dimBox.scrollHeight);
  console.log('offsetTop    :', dimBox.offsetTop, '(distance from offsetParent top)');
  console.log('scrollTop    :', dimBox.scrollTop, '(how far scrolled)');
});

document.querySelector('#rect-btn').addEventListener('click', () => {
  const rect = dimBox.getBoundingClientRect();
  console.log('getBoundingClientRect (relative to VIEWPORT):');
  console.log('  top:', rect.top, ' left:', rect.left);
  console.log('  width:', rect.width, ' height:', rect.height);
  console.log('  bottom:', rect.bottom, ' right:', rect.right);
  console.log('Position relative to DOCUMENT:');
  console.log('  docTop:', rect.top + window.scrollY);
  console.log('  docLeft:', rect.left + window.scrollX);
});

function isInViewport(element) {
  const r = element.getBoundingClientRect();
  return (
    r.top >= 0 &&
    r.left >= 0 &&
    r.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    r.right  <= (window.innerWidth  || document.documentElement.clientWidth)
  );
}

document.querySelector('#viewport-btn').addEventListener('click', () => {
  console.log('isInViewport(dimBox):', isInViewport(dimBox));
  console.log('window.innerWidth:', window.innerWidth, 'window.innerHeight:', window.innerHeight);
  console.log('window.scrollY:', window.scrollY);
});

console.groupEnd();


// ============================================================
// SECTION 9: EVENTS
// ============================================================
console.group('S9 · Events');

const eventDemo = document.querySelector('#event-demo');

// Basic click — shows event.target vs event.currentTarget
eventDemo.addEventListener('click', (e) => {
  console.log('--- Click event ---');
  console.log('e.target        →', e.target.tagName,        '(where the click landed)');
  console.log('e.currentTarget →', e.currentTarget.tagName, '(where listener is attached)');
  console.log('e.type:', e.type, '| e.bubbles:', e.bubbles);
});

// once option — auto-removes after first fire
const onceBtn = document.querySelector('#once-btn');
onceBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // don't also trigger the parent div listener
  console.log('{ once: true } fired — this handler will NOT fire again');
}, { once: true });

// preventDefault — stop link navigation
document.querySelector('#prevent-link').addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  console.log('Link click → e.preventDefault() called — navigation blocked');
});

// Custom event
document.querySelector('#custom-evt-btn').addEventListener('click', () => {
  const loginEvent = new CustomEvent('user:login', {
    detail: { userId: 42, role: 'admin' },
    bubbles: true,
    cancelable: true,
  });
  document.body.dispatchEvent(loginEvent);
});

document.body.addEventListener('user:login', (e) => {
  console.log('CustomEvent "user:login" received:', e.detail);
});

// passive scroll listener (performance)
window.addEventListener('scroll', () => {
  // passive — browser doesn't wait for JS before scrolling
}, { passive: true });

console.groupEnd();


// ============================================================
// EVENT DELEGATION (#menu)
// ============================================================
console.group('Event Delegation · #menu');

document.querySelector('#menu').addEventListener('click', (e) => {
  const item = e.target.closest('li');
  if (!item) return;
  console.log('Delegated click on menu item:', item.dataset.id, '→', item.textContent.trim());
});

console.log('One listener on #menu handles all <li> clicks (including future ones)');
console.groupEnd();


// ============================================================
// SECTION 11: DOCUMENT FRAGMENT
// ============================================================
console.group('S11 · DocumentFragment');

document.querySelector('#fragment-btn').addEventListener('click', () => {
  const fragList = document.querySelector('#fragment-list');
  fragList.innerHTML = ''; // reset

  const t0       = performance.now();
  const fragment = document.createDocumentFragment();

  ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'].forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    fragment.appendChild(li); // all DOM work off-screen — zero reflows yet
  });

  fragList.appendChild(fragment); // ONE reflow for all 5 items
  const t1 = performance.now();
  console.log('Fragment appended — 5 items in ONE reflow. Time:', (t1 - t0).toFixed(3), 'ms');
});

console.groupEnd();


// ============================================================
// SECTION 12: INTERSECTION OBSERVER
// ============================================================
console.group('S12 · IntersectionObserver');

const ioObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.textContent = '✓ In viewport!';
      console.log('IntersectionObserver: element entered viewport →', entry.target);
      ioObserver.unobserve(entry.target); // stop watching once visible
    }
  });
}, { threshold: 0.2 }); // fires when 20% visible

document.querySelectorAll('.lazy').forEach(el => ioObserver.observe(el));
console.log('Observing', document.querySelectorAll('.lazy').length, '.lazy elements — scroll down to trigger');

console.groupEnd();


// ============================================================
// SECTION 13: MUTATION OBSERVER
// ============================================================
console.group('S13 · MutationObserver');

const mutTarget = document.querySelector('#mutation-target');
let mutObs = null;

function startObserver() {
  mutObs = new MutationObserver((mutations) => {
    mutations.forEach(m => {
      console.log('MutationObserver fired:');
      console.log('  type        :', m.type);
      if (m.type === 'childList') {
        console.log('  addedNodes  :', m.addedNodes);
        console.log('  removedNodes:', m.removedNodes);
      }
      if (m.type === 'attributes') {
        console.log('  attributeName:', m.attributeName, '→', mutTarget.getAttribute(m.attributeName));
      }
      if (m.type === 'characterData') {
        console.log('  new text:', m.target.data);
      }
    });
  });

  mutObs.observe(mutTarget, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
  });

  console.log('MutationObserver started — watching #mutation-target');
}

startObserver();

let mutCount = 0;

document.querySelector('#mutate-text-btn').addEventListener('click', () => {
  mutTarget.textContent = `Mutated text #${++mutCount} at ${new Date().toLocaleTimeString()}`;
});

document.querySelector('#mutate-child-btn').addEventListener('click', () => {
  const span = document.createElement('span');
  span.textContent = ' [child node added]';
  span.style.color = 'steelblue';
  mutTarget.appendChild(span);
});

document.querySelector('#mutate-attr-btn').addEventListener('click', () => {
  mutTarget.setAttribute('data-version', Date.now());
});

console.groupEnd();


// ============================================================
// Q8: offsetWidth vs clientWidth vs scrollWidth (demo)
// ============================================================
console.group('Q8 · offsetWidth vs clientWidth vs scrollWidth');

document.querySelector('#q8-btn').addEventListener('click', () => {
  const box = document.querySelector('#q8-box');
  console.log('Element: 200px wide, 10px padding, 5px border, inner div is 500px');
  console.log('offsetWidth  (content+padding+border):', box.offsetWidth, '→ 200+20+10 = 230');
  console.log('clientWidth  (content+padding, no border, no scrollbar):', box.clientWidth);
  console.log('scrollWidth  (full scrollable content):', box.scrollWidth, '→ 500+ inner width');
});

console.groupEnd();


// ============================================================
// Q11: SHADOW DOM
// ============================================================
console.group('Q11 · Shadow DOM');

const widgetHost = document.querySelector('#widget');
const shadow = widgetHost.attachShadow({ mode: 'open' });
shadow.innerHTML = `
  <style>
    p { color: red; font-weight: bold; font-family: monospace; }
    :host { display: block; border: 2px dashed purple; padding: 0.5rem; border-radius: 4px; }
  </style>
  <p>I am inside Shadow DOM — external CSS cannot touch me.</p>
  <slot></slot>
`;

console.log('Shadow root attached. mode: open → host.shadowRoot:', widgetHost.shadowRoot);
console.log('External document.querySelector cannot pierce shadow root.');

console.groupEnd();


// ============================================================
// Q13: DYNAMIC EVENT DELEGATION
// ============================================================
console.group('Q13 · Dynamic Delegation');

const dynamicList = document.querySelector('#dynamic-list');
let itemCounter = 0;

// ONE listener — handles all current AND future items
dynamicList.addEventListener('click', (e) => {
  const li = e.target.closest('li[data-id]');
  if (!li) return;
  console.log('Delegated click → item id:', li.dataset.id, 'text:', li.textContent);
});

document.querySelector('#add-item-btn').addEventListener('click', () => {
  itemCounter++;
  const li = document.createElement('li');
  li.dataset.id  = `item-${itemCounter}`;
  li.textContent = `Dynamic Item ${itemCounter} (added at ${new Date().toLocaleTimeString()})`;
  li.style.cssText = 'padding:0.3rem;border-bottom:1px solid #eee;';
  dynamicList.appendChild(li);
  console.log(`Added ${li.dataset.id} — no new listener needed`);
});

console.log('Click "Add item", then click any item — ONE listener handles all');
console.groupEnd();


// ============================================================
// Q15: ATTRIBUTE vs PROPERTY
// ============================================================
console.group('Q15 · Attribute vs Property');

const attrInput = document.querySelector('#attr-input');

document.querySelector('#attr-prop-btn').addEventListener('click', () => {
  console.log('--- Attribute vs Property ---');
  console.log('getAttribute("value")  →', attrInput.getAttribute('value'),
              '(HTML attribute — always the INITIAL value from HTML)');
  console.log('.value                 →', attrInput.value,
              '(DOM property — CURRENT value, updated as user types)');
  console.log('');
  console.log('They diverge as soon as the user edits the input!');
  console.log('setAttribute resets the default; .value changes current state only.');
});

console.groupEnd();


// ============================================================
// DOCUMENT & WINDOW INFO (runs on load)
// ============================================================
console.group('Document & Window');
console.log('document.title      →', document.title);
console.log('document.URL        →', document.URL);
console.log('document.readyState →', document.readyState);
console.log('window.innerWidth   →', window.innerWidth);
console.log('window.innerHeight  →', window.innerHeight);
console.log('window.scrollY      →', window.scrollY);
console.groupEnd();

document.addEventListener('DOMContentLoaded', () => {
  console.log('%cDOMContentLoaded fired — DOM is ready', 'color:green;font-weight:bold');
});

window.addEventListener('load', () => {
  console.log('%cwindow load fired — everything (images, CSS) fully loaded', 'color:blue;font-weight:bold');
});
