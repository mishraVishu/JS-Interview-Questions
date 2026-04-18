//Basic Promise Polyfill
function PromisePolyfill(executor){
    let isRejected = false;
    let isFulfilled = false;
    let onResolve;
    let onReject;
    let value ;
    let error;

    function resolve(val){
        isFulfilled = true;
        value = val;
        if(typeof onResolve === 'function') onResolve(value);
    }

    function reject(err){
        isRejected = true;
        error = err;
        if(typeof onReject === 'function') onReject(error);
    }

    this.then = function (callback){
        onResolve = callback;
        if(isFulfilled) onResolve(value);
        return this;
    }

    this.catch = function (callback){
        onReject = callback;
        if(isRejected) onReject(error);
        return this;
    }

    try{
        executor(resolve,reject)
    }catch(e){
        reject(e)
    }
}

const p = new PromisePolyfill((resolve, reject) =>{
   resolve({name:'Vaishali',age:29})
});

p.then((res) => console.log(res))
  .catch((err) => console.log(err));  

// Promise.all polyfill
function promiseAll(promises) {
   const results = [];
   let completed = 0;

   return new Promise((resolve,reject) => {
        if(promises.length === 0) return results;

        promises.forEach((promise,i) => {
            Promise.resolve(promise)
            .then((res) => {
                results[i] = res;
                completed++;

                if(completed === promises.length){
                    resolve(results);
                }
            })
            .catch(err => reject(err))
        });

   })
}

promiseAll([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
]).then((res) => console.log(res));  // [1, 2, 3]


// Promise.allSettled polyfill
function promiseAllSettled(promises){
    const results = [];
    let completed = 0;

    return new Promise((resolve, reject) => {
        if(promises.length === 0) return resolve(results);

        promises.forEach((promise,i) => {
            Promise.resolve(promise)
                    .then((res) => {
                        results[i] = {status: 'resolved', value: res};
                        completed++;

                        if(completed === promises.length){
                            resolve(results);
                        }
                    })
                    .catch((err) => {
                        results[i] = {status: 'rejected', reason: err};
                        completed++;

                        if(completed === promises.length) resolve(results); // ✅ check here too
                    })
        })
    })
}

promiseAllSettled([
  Promise.resolve('success'),
  Promise.reject('error'),
  Promise.resolve('another success')
]).then(res =>console.log(res));


// Promise.race polyfill
function promiseRace(promises){
    
    return new Promise((resolve,reject) => {
        if(promises.length === 0) return ;

        promises.forEach((promise,i) => {
            Promise.resolve(promise)
                .then(res => resolve(res))
                .catch(err => reject(err));
        })
    })
}

promiseRace([
  new Promise(res => setTimeout(() => res('slow'), 1000)),
  new Promise(res => setTimeout(() => res('fast'), 100))
]).then(res =>console.log(res)); 

// promise.any 
function promiseAny(promises){
    let completed = 0;

    return new Promise((resolve,reject) => {
        if (promises.length === 0) return;

        promises.forEach((promise,i) => {
            Promise.resolve(promise)
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    completed++;

                    if(completed === promises.length){
                        reject(new AggregateError(err, 'All promises were rejected'));
                    }
                })
        })
    })

}

promiseAny([
  Promise.reject('error 1'),
  Promise.reject('success'),
  Promise.reject('error 2')
]).then(res => console.log(res));  // 'success'

// Map polyfill

const arr = [1,2,3,4,5];

Array.prototype.myMap = function(fn){
    const result = [];
    for(let i=0;i<this.length;i++){
        result.push(fn(this[i],i,this));
    }
    return result;
}

console.log(arr.myMap(val => val*2));

// Filter polyfill

Array.prototype.myFilter = function(fn){
    const result = [];
    for(let i=0;i<this.length;i++){
        if(fn(this[i],i,this)){
            result.push(this[i]);
        }
    }
    return result;
}

console.log(arr.myFilter(val => val>2));

// reduce polyfill

Array.prototype.reduce = function(fn,initialval){
    if(typeof fn !== 'function') throw new Error("callback fn must be passed");

    let acc;
    let startIndex = 0;

    if(arguments.length <2){
        acc = this[0];
        startIndex = 1;
    }else{
        acc = initialval;
        startIndex = 0;
    }

    for(let i=startIndex; i< this.length; i++){
        if(i in this)
        acc = fn(acc,this[i],i,this)
    }

    return acc;
}

console.log(arr.reduce((acc,val) => acc+val,0));


