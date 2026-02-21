const arr = [1, 2, 3, 4];

const nums = arr.map((element, i, arr) => element * 2);
// console.log(nums);

const filteredArr = arr.filter((element, i, arr) => element > 2);
// console.log(filteredArr);

const val = arr.reduce((acc, val, i, arr) => {
    return acc + val;
}, 0)
// console.log(val);

//Map polyfill

Array.prototype.myMap = function (fn) {
    let temp = [];
    for (let i = 0; i < this.length; i++) {
        temp.push(fn(this[i], i, this));
    }
    return temp;
}

const nums2 = arr.myMap((element, i, arr) => element * 2);
// console.log(nums2);

// Filter Polyfill

Array.prototype.myFilter = function (fn) {
    const temp = [];
    for (let i = 0; i < this.length; i++) {
        if (fn(this[i], i, this)) {
            temp.push(fn(this[i], i, this))
        }
    }

    return temp;
}

const filteredArr2 = arr.filter((element, i, arr) => element > 2);
// console.log(filteredArr2);

// Reduce polyfill

Array.prototype.myReduce = function (fn, initialVal) {
    let acc;
    let startIdx;
    if (arguments.length > 1) {
        acc = initialVal;
        startIdx = 0;
    } else {
        acc = this[0];
        startIdx = 1;
    }
    for (let i = startIdx; i < this.length; i++) {
        acc = fn(acc, this[i], i, this);
    }
    return acc;
}

const val2 = arr.myReduce((acc, val, i, arr) => {
    return acc + val;
}, 0)
// console.log(val2);

const students = [
    { name: "piyush", rollNumber: 31, marks: 80 },
    { name: "jenny", rollNumber: 15, marks: 69 },
    { name: "Kaushal", rollNumber: 16, marks: 35 },
    { name: "Dilpreet", rollNumber: 7, marks: 55 },
]

const names  = students.map((item) => item.name.toUpperCase() );
// console.log(names);

const moreThanSixty = students.filter((item) => item.marks > 60);
// console.log(moreThanSixty);

const totalMarks = students.reduce((acc,item) => {
    return acc+=item.marks;
},0);
// console.log(totalMarks);

const nameOfStudentsHavingMarksGreaterThanSixty = students
.filter((item) => item.marks >60)
.map((item) => item.name);

// console.log(nameOfStudentsHavingMarksGreaterThanSixty);

const totalMarksofStuMoreThanSixtyAfterAddingTwentyMarksToThoseStuLessThan60 = students.map((item) => {
    if(item.marks < 60){
        item.marks +=20
    }
    return item;
})
.filter((item) => item.marks >= 60)
.reduce((acc,item)=>{ return acc+=item.marks},0)

// console.log(totalMarksofStuMoreThanSixtyAfterAddingTwentyMarksToThoseStuLessThan60)
