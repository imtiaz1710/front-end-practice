"use strict";

/*****************************************************.******************************From Home************************************************* */

var arr = [2, 4, 5];

var obj = {
    name: 'imtiaz',
    age: 24
}

for(var value of arr)
{
    console.log(value);
}

for(var prop in obj)
{
    console.log(obj[prop]);
}

// class creation by construtor function
function Book1(name, author)
{
    this.name = name;
    this.author = author;
    this.print = function(){
        console.log('name'+this.name+'author'+this.author);
    };
}
var obj1 =new Book1('2','2');

// Class creation by  factory function 
function Book2(name, date)
{
    return{
        name, //according to es6 syntax
        date,
        print : function(){
            console.log(name);
        }
    }
}
var obj2 = Book2('imtiaz','33/4444');

//abstruction 
function Book3(name, author)
{
    this.name = name;
    this.author = author;
    let publisher = 'Tanjila';
    this.print = function(){
        console.log(`Name = ${this.name} Author = ${this.author} Publisher = ${publisher}`);
    };
    Object.defineProperty(this, 'pub', {get: () => publisher});
}
var obj3 =new Book3('Dep','Imtiaz');

/**********************************************************************END Home*********************************************************************************/

//prototype 

function Car(name, model) {
    let car = Object.create(Car.prototype);
    car.name = name;
    car.model = model;
    return car;
}

Car.prototype = {
    run(){
        console.log ('car is running');
    }
}

var carObj = Car('Tesla', 'model 3');
carObj.run();

// new keyword and replace upper portion with new 

function Car(name, model) {
    this.name = name;
    this.model = model;
}

Car.prototype = {
    run(){
        console.log ('car is running');
    }
}

var carObj =new Car('Tesla', 'model 3');
carObj.run();


