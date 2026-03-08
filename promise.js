//  Javascript executes synchronous code first then asynchronous code.

// We need promises in JavaScript to handle asynchronous operations in a more manageable, readable, and reliable way.

// Before promises, callbacks were used for async tasks (like network requests, timers, etc.), but callbacks can lead to "callback hell"—deeply nested, hard-to-read code and difficult error handling.

// Promises solve this by:

// Allowing chaining of async operations with .then() and .catch()
// Providing a clear way to handle success and errors
// Making code easier to read and maintain

//A promise is javascript is an object that represents the eventual completion or failure of an asynchronous operation and its resulting value.
// It has three states - 
// 1. Pending (initial state, not yet completed).
// 2. Fullfilled (opeartion completed successfully).
// 3. Rejected (operation failed)
//We use .then() to handle success and .catch() to handle failure.

// const myPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve("Promise resolved")
//         // reject("Promise rejected!");
//     }, 1000)
// })

// myPromise.then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.error(e);
// })

// Another Exaample having callbacks

// function getData(callback) {
//     setTimeout(() => {
//         callback(null, "Data 1");
//     }, 1000);
// }

// function processData(data, callback) {
//     setTimeout(() => {
//         callback(null, data + " processed");
//     }, 1000);
// }

// function saveData(data, callback) {
//     setTimeout(() => {
//         callback(null, data + " saved");
//     }, 1000);
// }

// // Callback hell
// getData((err, data1) => {
//     if (err) return console.error(err);
//     processData(data1, (err, data2) => {
//         if (err) return console.error(err);
//         saveData(data2, (err, result) => {
//             if (err) return console.error(err);
//             console.log(result);
//         });
//     });
// });

// Refactoring abouve code using Promises

// function getData() {
//     return new Promise((resolve,reject) => {
//         setTimeout(() => {
//             resolve("Data 1");
//         }, 1000);
//     });
// };

// function processData(data) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(data + " processed");
//         }, 1000);
//     });
// };


// function saveData(data) {
//     return new Promise((resolve,reject) => {
//         setTimeout(() => {
//             resolve(data + " saved");
//         }, 1000);
//     });
// };

// // Promise Chaining
// getData()
// .then((res) =>{
//     return res;
// })
// .then((res) => {
//     return processData(res);
// })
// .then((res) => {
//     return saveData(res);
// })
// .then((res) => {
//     console.log(res);
// })

// Promise Combinators

// Promise.all() - takes an array of promises and returns a single promise. The returned promise resolves when all input promises resolve , or reject if any input promise rejects.
// If all Promises resolves then you get an array of their results.
// if ant Promise fails then the returned promise rejects with that error

const p1 = Promise.resolve("First");
const p2 = Promise.resolve("Second");
const p3 = Promise.resolve("Third");

// Promise.all([p1,p2,p3])
// .then((res) => {
//     console.log(res)
// })
// .catch((error) => {
//     console.error(error);
// })

// Promise.race() - It also takes an array of promises and return a single Promise . The returned promise resolves or rejects as soon as the first input resolve or reject

// const p4 = new Promise(resolve => setTimeout(() => resolve("First"), 1000));
// const p5 = new Promise(resolve => setTimeout(() => resolve("Second"), 500));
// const p6 = new Promise(resolve => setTimeout(() => resolve("Third"), 2000));

// Promise.race([p4, p5, p6])
//   .then(result => {
//     console.log(result); // "Second" (because p2 resolves first)
//   })
//   .catch(error => {
//     console.error(error);
//   });

// Promise.allSettled - It aso takes an array of promises and return a single promise. The promise resolves when each Input has settled i.e either resolve or reject. It gives an array with outcome of each Promise. 

// const p7 = Promise.resolve("Success");
// const p8 = Promise.reject("Error");
// const p9 = Promise.resolve("Another success");

// Promise.allSettled([p7, p8, p9])
//   .then(results => {
//     console.log(results);
//   });

// Promise.any() -   Promise.any is a Promise combinator that takes an array of promises and returns a single promise.
// The returned promise resolves as soon as any one of the input promises resolves.
// If all input promises reject, it rejects with an AggregateError.

// const p10 = Promise.reject("Error 1");
// const p11 = new Promise(resolve => setTimeout(() => resolve("Success 2"), 500));
// const p12 = new Promise(resolve => setTimeout(() => resolve("Success 3"), 1000));

// Promise.any([p10, p11, p12])
//   .then(result => {
//     console.log(result); // "Success 2" (the first fulfilled promise)
//   })
//   .catch(error => {
//     console.error(error); // Only runs if all promises reject
//   });


// async - await -  are keywords in js , that makes working with Promisese more easrier and code more readable.
// async function always returns a Promise you can use await to pause the execution of the function until a Promise resolve( or reject).

// function fetchData(){
//     return new Promise((resolve,reject) => {
//         setTimeout(() => {
//             resolve("Data Loaded!")
//         },1000)
//     })
// };

// async function getData(){
//     try {
//         const data = await fetchData();
//         console.log(data);
//     } catch (error) {
//         console.log(error);
//     }
// };

// getData();

// async function results(){
//     try {
//         const m1 = await p1;
//         const m2 = await p2;
//         const m3 = await p3;
//         console.log(m1,m2,m3);
//     } catch (error) {
//         console.error(error)
//     }
// }

// results();


// ----------------- Interview Questions -------------------

//Ques 1 - What's the output?

// console.log("start");

// const promise1 = new Promise((resolve,reject) => {
//     console.log(1);
//     resolve(2);
// });

// promise1.then(res => console.log(res));

// console.log("end");

// console.log("start"); runs first (synchronous).
// The promise constructor runs immediately, so console.log(1); is executed next (synchronous).
// console.log("end"); runs after the promise constructor finishes (still synchronous).
// The .then() callback is executed after the synchronous code finishes, so console.log(2); is printed last (asynchronous, microtask).

// Ques 2 - What's the o/p?

// console.log("start");

// const promise1 = new Promise((resolve, reject) => {
//     console.log(1);
//     resolve(2);
//     console.log(3);
// });

// promise1.then(res => console.log(res));

// console.log("end");

// start
// 1
// 3
// end
// 2

// Ques 3 - What's the output?

// console.log("start");

// const fn = () => {
//     return new Promise((resolve, reject) => {
//         console.log(1);
//         resolve("Success");
//     });
// }

// console.log("middle");

// fn().then(res => console.log(res));

// console.log("end");

// console.log("start"); runs first (synchronous).
// console.log("middle"); runs next (synchronous).
// fn() is called, which immediately logs 1 (synchronous inside promise executor).
// console.log("end"); runs after fn() (synchronous).
// The .then() callback logs "Success" after the synchronous code finishes (asynchronous, microtask).

// Ques 4 - What's the output ?

// function job(){
//     return new Promise((resolve, reject) => {
//         reject();
//     });
// };

// let promise = job();

// promise
//     .then(() => console.log("Success 1"))
//     .then(() => console.log("Success 2"))
//     .then(() => console.log("Success 3"))
//     .then(() => console.log("Success 4"))
//     .catch(() => console.log("Error 1"))
//     .then(() => console.log("Success 5"))

// Error 1
// Success 5

// Ques 5 - What's the o/p?

// function job(state){
//     return new Promise((resolve, reject) =>{
//         if(state){
//             resolve("success")
//         } else {
//             reject("error")
//         }
//     })
// }

// let promise = job(true);

// promise.then((data) => {
//     console.log(data); // success

//     return job(false);
// })
// .catch(function (error){
//     console.log(error); // error
//     return "Error Caught";
// })
// .then((data) =>{
//     console.log(data); // Error Caught
//     return job(true);
// })
// .catch((error) => {
//     console.log(error);
// })

// Ques 6 - What's the o/p?

// function job(state){
//     return new Promise((resolve, reject) =>{
//         if(state){
//             resolve("success")
//         } else {
//             reject("error")
//         }
//     })
// }

// let promise = job(true);

// promise.then(data => {
//     console.log(data); // success
//     return job(true);
// })
// .then((data) => {
//     if(data !== 'victory'){
//         throw "Defeat";
//     }
//     return job(true);
// })
// .then((data) => console.log(data)) 
// .catch((error) => {
//     console.log(error); // Defaet
//     return job(false);
// })
// .then((data) => {
//     console.log(data);
//     return job(true);
// })
// .catch(function (error){
//     console.log(error); // error
//     return "Error Caught";
// })
// .then((data) => {
//     console.log(data) // Error Caught
//     return new Error("test");
// })
// .then((data) => {
//     console.log("Success: ", data.message); // Success: test
// })
// .catch((data) => {
//     console.log("Error: ", data.message);
// })

// If you return an Error object (not throw), it is treated as a normal value and passed to the next .then.
//Only if you throw an error (or return a rejected promise), it will go to .catch.

// Ques 7 - Promise Chaining

// const firstPromise = new Promise((resolve,reject) => {
//     resolve("First!");
// });

// const secondPfomise = new Promise((resolve, reject) => {
//     resolve(firstPromise);
// });

// secondPfomise.then((res) => {
//     return res;
// }).then((res) => {
//     console.log(res);
// })

// Ques 8 -  Rewrite this example code using 'async/await' instead of '.then/catch'

// function loadJson(url){
//     return fetch(url).then((res) => {
//         if(res.status === 200){
//             return res.json();
//         }else{
//             throw new Error(res.status)
//         }
//     })
// }


// async function loadJson(url){
//     try {
//         const res = await fetch(url);
//         if(res.status === 200){
//             const data = await res.json();
//             return data;
//         }else{
//             throw new Error(res.status);
//         }
//     } catch (error) {
//         console.log(error.status);
//     }
// }

// loadJson("https://jsonplaceholder.typicode.com/users").catch((err) => {
//     console.log(err);
// })

// loadJson();

// Ques 9 - Solve Promise Recursively

// function promRecurse(funcPromises){
//     if(funcPromises.length === 0) return ;

//     currentPromise = funcPromises.shift();

//     currentPromise.then((res) =>console.log(res)).catch((error) => console.log(error));

//     promRecurse(funcPromises);
// }

// promRecurse([p1,p2,p3]);


// Ques 10 - Promise Polyfill Implementation

function promisePolyfill(executor) {
    let onResolve = null;
    let onReject = null;
    let isFullFilled = false;
    let isRejected = false;
    let error = null;
    let value = null;

    function resolve(val){
        isFullFilled = true;
        value = val;

        if(typeof onResolve === 'function'){
            onResolve(val)
        }
    }

    function reject(err){
        isRejected = true;
        error = err;

        if(typeof onReject === 'function'){
            onReject(err);
        }
    }
    
    this.then = function(callback){
        onResolve = callback;
        if(isFullFilled) onResolve(value)
        return this;
    }

    this.catch = function(callback){
        onReject = callback;
        if(isRejected) onReject(error);
        return this;
    }

    try {
        executor(resolve,reject)
    } catch (error) {
        reject(error)
    }
}

const examplePromise = new promisePolyfill((resolve, reject) => {
    setTimeout(() => {
        resolve(23)
    },1000)
});

examplePromise
.then((res) => console.log(res))
.catch((err) => console.error(err));

// Improved Promise Polyfill (chainable, async callbacks, multiple handlers)
function improvedPromisePolyfill(executor) {
    let state = 'pending'; // 'fulfilled', 'rejected'
    let value;
    let handlers = [];

    function resolve(val) {
        if (state !== 'pending') return;
        state = 'fulfilled';
        value = val;
        setTimeout(() => {
            handlers.forEach(handle);
        }, 0);
    }

    function reject(err) {
        if (state !== 'pending') return;
        state = 'rejected';
        value = err;
        setTimeout(() => {
            handlers.forEach(handle);
        }, 0);
    }

    function handle(handler) {
        console.log(handler)
        if (state === 'pending') {
            handlers.push(handler);
            return;
        }
        if (state === 'fulfilled') {
            if (!handler.onFulfilled) {
                handler.resolve(value);
            } else {
                try {
                    const result = handler.onFulfilled(value);
                    handler.resolve(result);
                } catch (err) {
                    handler.reject(err);
                }
            }
        } else if (state === 'rejected') {
            if (!handler.onRejected) {
                handler.reject(value);
            } else {
                try {
                    const result = handler.onRejected(value);
                    handler.resolve(result);
                } catch (err) {
                    handler.reject(err);
                }
            }
        }
    }

    this.then = function (onFulfilled, onRejected) {
        return new improvedPromisePolyfill((resolve, reject) => {
            handle({
                onFulfilled,
                onRejected,
                resolve,
                reject
            });
        });
    };

    this.catch = function (onRejected) {
        return this.then(undefined, onRejected);
    };

    try {
        executor(resolve, reject);
    } catch (err) {
        reject(err);
    }
}

// Example usage with multiple chains:
const improvedPromise = new improvedPromisePolyfill((resolve, reject) => {
    setTimeout(() => {
        resolve('Step 1');
    }, 500);
});

improvedPromise
    .then(res => {
        console.log(res); // Step 1
        return 'Step 2';
    })
    .then(res => {
        console.log(res); // Step 2
        return new improvedPromisePolyfill((resolve) => setTimeout(() => resolve('Step 3'), 500));
    })
    .then(res => {
        console.log(res); // Step 3
        throw new Error('Something went wrong!');
    })
    .catch(err => {
        console.error('Caught:', err.message); // Caught: Something went wrong!
        return 'Recovered';
    })
    .then(res => {
        console.log(res); // Recovered
    });






