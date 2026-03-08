// Ques 1 - What is Event Loop?
// Event Loop in JS is responsible for asynchronous operations.
// JS is single-threaded so it can execute one piece of code at a time.Event Loop allows javascript to handle asynchronous tasks(setTimeout, promises) by: 

// 1.Running code from the call stack (main thread).
// 2.When asynchronous operations finish, their callbacks are placed in the callback queue (or microtask queue for promises).
// 3.The Event Loop constantly checks if the call stack is empty. If it is, it moves the first callback from the queue to the stack and executes it.
// 4.This process repeats, allowing JavaScript to handle many tasks efficiently without blocking the main thread.

// Ques 2 - Why we need event loop to manage these task Queues and microtask queues?

// We need the event loop to manage the task queue and microtask queue because JavaScript is single-threaded and can only execute one operation at a time. Without the event loop:

// Asynchronous tasks (like timers, network requests, or promises) would not be handled efficiently.
// The main thread would be blocked by long-running operations, making the UI unresponsive.
// There would be no way to schedule and coordinate when callbacks or microtasks (like promise resolutions) should run.
// The event loop ensures:

// Asynchronous callbacks are executed only when the call stack is empty, preventing blocking.
// Microtasks (like promise callbacks) are given priority and executed before the next task from the callback queue.
// JavaScript can handle multiple operations smoothly, keeping the application responsive.


// Ques 3 - What's the o/p

//blockMainThred();

//console.log('Start');

// function blockMainThred(){
//     const start = Date.now();
//     while(Date.now() - start < 3000){
//         console.log("running");
//     }
// }

//console.log("End"); // running, start, end

//Ques 4 - What's the o/p?

// setTimeout(function a() {}, 1000);

// setTimeout(function b() {}, 500);

// setTimeout(function c() {}, 0)

// function d(){
//     console.log('d Runs');
// }

// d();
// Task Queue - a, b, d
// Call Stack - 

// d runs
// c
// b
// a

//Ques 5 - What's the o/p

// function a(){
//     for(var i=0; i<3; i++){
//         setTimeout(function log(){
//             console.log(i)
//         },i*1000);
//     }
// }

// a(); // 3 3 3

// Task Queue - log() log() log()
//                 i.    i    i

// Ques 6 - What's the o/p

// Promise.resolve()
//     .then(function a(){
//         Promise.resolve().then(function d(){
//             console.log("d Runs");
//         });
//         Promise.resolve().then(function e(){
//             console.log("e Runs");
//         })
//         throw new Error("Error occured!");
//         Promise.resolve().then(function f(){
//             console.log("f Runs")
//         });
//     })
//     .catch(function b(){
//         console.log("b Runs");
//     })
//     .then(function c(){
//         console.log("c Runs")
//     });

// Micro task - a()- d() --> d runs, 
//                 e()  ---> e runs
//                  b() ----> b runs
//                  c() ----> c runs(because catch also retuns Promise so it will go inside .then after .catch)

// Ques 7 - What's the o/p

function pause(millis){
    return new Promise(function p(resolve){
        setTimeout(function s(){
            resolve("resolved");
        },millis)
    });
}

const start = Date.now();
console.log("Start");

pause(1000).then((res) => {
    const end = Date.now();
    const secs = (end- start) / 1000;
    console.log(res, ":", secs);
});

// call stack ----> Start
// Micro Task - P() anonymous() ----> 
// Task Queue - s() ----> resolved
