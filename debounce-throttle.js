// Q1 - Create a button UI and add debounce as follows -
// show "Button presses X times" every time button is pressed.
// Increase "Triggered Y times" count after 800ms of debounce.

const btn = document.querySelector(".increment-btn");
const btnPress = document.querySelector(".increment_pressed");
const count = document.querySelector(".increment_count");

let pressCount = 0;
let triggerCount = 0;

let debounceCount = myDebounce(() =>{
    count.innerHTML = ++triggerCount;
},800)

btn.addEventListener("click",() => {
    btnPress.innerHTML = ++pressCount;
    debounceCount();
})

//Q2 - Create debounce polyfill implementation

function myDebounce(cb,delay){
    let timer ;

    return function(...args){
        if(timer) clearTimeout(timer);
        timer = setTimeout(() =>{
            cb(...args)
        },delay)
    }
}

//Q3 - Throttle Polyfill Implementation

function myThrottle(cb,delay){
    let last =0;

    return function(...args){
        let now = new Date().getTime();
        if(now-last < d) return;
        last = now;
        return cb(...args)
    }
}