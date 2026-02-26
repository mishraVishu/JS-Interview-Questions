class Teacher{
    // used to initialize property for class
    constructor(name, channel, likes= 0){
        this.name = name;
        this.channel = channel;
        this.videoLikes = likes;
    }

    // functions are defined without function keyword inside class body only.
    intro(){
        return `Hey its ${this.name}! Welcome to ${this.channel}`;
    }

    like(){
        this.videoLikes++;
        return `Current Likes ${this.videoLikes}`
    }
}

const roadsideCoder = new Teacher("Vaishali", "MagicalJS");

// Converting to function constructor

function Teachers(name,channel,likes = 0){
    this.name = name;
    this.channel = channel;
    this.videoLikes = likes;
}

Teachers.prototype.intro = function(){
    return `Hey its ${this.name}! Welcome to ${this.channel}`;
}

Teachers.prototype.likes = function(){
    this.videoLikes++;
    return `Current Likes ${this.videoLikes}`
}

const newTeacher = new Teachers("Vishu", "MagicalThingsInJS");
console.log(newTeacher.intro(),newTeacher.likes());

// Inheritance
class YouTubeTeacher extends Teacher{
    constructor(name, channel, likes, subscribers){
        super(name, channel,likes);
        this.subscribers = subscribers;
    }

    static paidCourse(){
        //return `Frontend Interview Prep course from ${this.channel}`;
        return new YouTubeTeacher("Piyush", "RoadsideCoder", 69, "90K");
    }

    subscribersCount(){
        return `${this.channel} has ${this.subscribers}`;
    }
}

const yteacher = new YouTubeTeacher("Vaishali", "MagicalJS", 100, '90K');
console.log(yteacher.intro());
console.log(yteacher.subscribersCount());
//console.log(yteacher.paidCourse()) // Not accessible for instances
console.log(YouTubeTeacher.paidCourse().intro());

// ------------------ Interview Questions --------------------

// Ques 1 - Difference between classes and objects?
// Ans - Classes are blueprint for creating objects and objects are actual instances created using classes which can access those methods and properties defined inside classes.

//Ques 2 - How Inheritance works in javascript?
// Ans - Inheritance in JavaScript works through the prototype chain.

// 1. When you create a class that extends another class (e.g., class Child extends Parent), the child class inherits properties and methods from the parent class.
// 2. Internally, JavaScript sets the prototype of the child class’s prototype to the parent class’s prototype. This means if a property or method is not found on the child, JavaScript looks up the prototype chain to the parent.
// 3. The super keyword is used in the child class to call the parent’s constructor and methods.

//Ques 3 - What's the output?
// class Employee{
//     constructor(){
//         this.name = 'John'
//     }
//     constructor(){
//         this.age = 30;
//     }
// }

// let emp1 = new Employee();
//console.log(emp1); // Uncaught SyntaxError: A class may only have one constructor (at Class-and-constructor.js:82:5)

// Ques 4 - Which approach is better and why?

const jamesBond = {
    firstName: 'Vaishali',
    lastName: 'Mishra',
    getFullName: function(){
        return `${this.firstName} ${this.lastName}`.trim();
    }
}

jamesBond.getFullName();

//or

class Person{
    constructor(firstName, lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

Person.prototype.getFullName = function(){
    return `${this.firstName} ${this.lastName}`.trim();
}

const newPerson = new Person("Vaishali", "Mishra");
newPerson.getFullName();

// Ans - Class based approach is more better for creating multiple Objects with same structure so reusable, Scalable code and getFullName() is registered on Prototype so shared among all instances of Person class, saving memeory.
// Object literal approach is fine for single-use or simple objects, but not for creating many similar objects.

//Ques 6 - Implement this - 
// const result = calc.add(10).subtract(5).multiply(2).divide(4).getResult();
// console.log(result);

class Calculator{
    constructor(){
        this.result = 0;
    }

    add(num){
        this.result += num;
        return this;
    }

    subtract(num){
        this.result -= num;
        return this;
    }

    multiply(num){
        this.result *= num;
        return this;
    }

    divide(num){
        this.result /= num;
        return this;
    }

    getResult(){
        return this.result;
    }
}
const calc = new Calculator()
const result = calc.add(10).subtract(5).multiply(2).divide(4).getResult();
console.log(result); //2.5

// Ques 7 - Inhetitance and Polymorphism.
// Implement a Shape class with an area() method.
// Create  subclasses Circle and Square that inherit from shape and ovveride the area() method to calculate their respective areas.

class Shape{
    area(){
        return 0;
    }
}

class Circle extends Shape{
    constructor(radius){
        super();
        this.radius = radius;
    }

    area(){
        return Math.PI *(this.radius*this.radius);
    }
}

class Sqaure extends Shape{
    constructor(side){
        super();
        this.side = side;
    }

    area(){
        return this.side*this.side;
    }
}

const cArea = new Circle(5);
console.log(cArea.area());

const sArea = new Sqaure(6);
console.log(sArea.area());

// Ques 8 - What are Getters and Setters in JS?
//Getters and setters in JavaScript are special methods that allow you to define how to access (get) and update (set) the properties of an object.

// A getter is defined using the get keyword and allows you to access a property like a normal property, but it actually calls a function.
// A setter is defined using the set keyword and allows you to set a property value, but it actually calls a function.

class Person2 {
    constructor(name) {
        this._name = name;
    }
    get name() {
        return this._name.toUpperCase();
    }
    set name(value) {
        this._name = value.trim();
    }
}

const p = new Person2("vaishali");
console.log(p.name); // "VAISHALI"
p.name = "  Mishra  ";
console.log(p.name); // "MISHRA"

class Rectangle {
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        if (value > 0) {
            this._width = value;
        } else {
            console.log("Width must be positive");
        }
    }

    get height() {
        return this._height;
    }

    set height(value) {
        if (value > 0) {
            this._height = value;
        } else {
            console.log("Height must be positive");
        }
    }

    // Computed property
    get area() {
        return this._width * this._height;
    }
}

const rect = new Rectangle(10, 5);
console.log(rect.area); // 50

rect.width = 20;
console.log(rect.area); // 100

rect.height = -3; // "Height must be positive"
console.log(rect.height); // 5 (unchanged)

//Getters and setters allow you to add logic when reading or updating properties, such as validation or returning computed values.