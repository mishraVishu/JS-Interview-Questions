// Q1 - What is Event Propagation?
// Event propagation is the process that defines how events travel through the DOM tree in a web page. It consists of three phases:

// Capturing Phase: The event starts from the window and travels down to the target element.
// Target Phase: The event reaches the target element.
// Bubbling Phase: The event bubbles up from the target element back to the window.

// Q2 - What is Event bubbling?
// Event bubbling is a phase of event propagation in the DOM where an event starts at the target element and then bubbles up to its parent elements, all the way up to the window. 
// This means that if you click a child element, the event handler for that child runs first, then the event handlers for its ancestors (parent, grandparent, etc.) are triggered in order.
// By default, most event listeners use bubbling. You can stop bubbling using event.stopPropagation().

const div = document.querySelector('div');
const form = document.querySelector('form');
const button = document.querySelector('#btn');

// div.addEventListener('click',(event) => {
//     console.log("clicked div");
// })

// form.addEventListener('click',(event) => {
//     event.preventDefault();
//     console.log("clicked form");
// })
// button.addEventListener('click',(event) => {
//     event.preventDefault();
//     console.log("clicked button");
// })

// Q3 - Name a few events that do NOT bubble?
// Some DOM events do not bubble up the DOM tree. Examples include:
// - blur
// - focus
// - load
// - unload
// - reset
// - scroll
// - mouseenter
// - mouseleave
// These events only trigger on the target element and do not propagate to ancestor elements.

// Q4 - event.target vs this.target vs event.currentTarget
// event.target: The element that actually triggered the event (where the event originated).
// event.currentTarget: The element on which the event listener is currently executing (the one you attached the handler to).
// this: In a regular function (not arrow function), inside an event handler, 'this' refers to the element the handler is attached to (same as event.currentTarget).
// this.target: (Does NOT exist in the DOM event API; it's incorrect.)

// div.addEventListener('click',(event) => {
//     console.log("clicked div", event.target.tagName,event.currentTarget.tagName,this);
// })

// form.addEventListener('click',(event) => {
//     event.preventDefault();
//     console.log("clicked form",event.target.tagName,event.currentTarget.tagName,this);
// })
// button.addEventListener('click',(event) => {
//     event.preventDefault();
//     console.log("clicked button",event.target.tagName,event.currentTarget.tagName,this);
// })

// Q4 - What is Event Capturing/ Trickling?


// div.addEventListener('click',(event) => {
//     console.log("clicked div");
// },{capture:true})

// form.addEventListener('click',(event) => {
//     event.preventDefault();
//     console.log("clicked form");
// },{capture:true})
// button.addEventListener('click',(event) => {
//     event.preventDefault();
//     console.log("clicked button");
// },{capture:true})

//Q5 - How to stop bubbling or capturing?
// You can stop event bubbling or capturing by calling event.stopPropagation() inside your event handler.
// This prevents the event from propagating further through the DOM tree (neither up nor down).
//
// Example:
button.addEventListener('click', function(event) {
  event.stopPropagation(); // Stops the event from reaching parent handlers
  console.log('Button clicked, propagation stopped');
});
//
// There is also event.stopImmediatePropagation(), which stops other handlers of the same event on the same element from running.

//Q6 - What is Event delegation?
// Event delegation is a technique in which you add a single event listener to a parent element instead of multiple listeners to individual child elements.
// The parent listens for events that bubble up from its children, and you use event.target to determine which child triggered the event.
// This is efficient for handling events on many child elements, especially if they are created dynamically.
//
// Example:
document.getElementById('list').addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    console.log('Clicked:', event.target.textContent,event);
  }
});

// Q7 - Create a modal that closes on clicking the negative space
// Fixed: Typo in variable name, and ensure both modal and container are shown/hidden together.
const container = document.querySelector('.modalContainer');
const btn = document.querySelector('.modalButton');
const modal = document.querySelector('.modal');

btn.addEventListener('click', () => {
    // Show modal and container
    if (container) container.style.display = 'flex';
    if (modal) modal.style.display = 'flex';
});

if (container) {
    container.addEventListener('click', (event) => {
        // Only close if the background (container) itself is clicked
        if (event.target === container) {
            container.style.display = 'none';
            if (modal) modal.style.display = 'none';
        }
    });
}



