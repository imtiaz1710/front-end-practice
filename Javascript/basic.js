const { reject } = require('underscore');
var _ = require('underscore');


var namee = 'imtiaz';
console.log(namee);
var array = ['imtiaz','zahid vai', 'atik vai'];
console.log(array[0]); 

function add(a, b){
    return a+b;
}

console.log(add(3,5));

//callback function 

function callbackFun(name)
{
    console.log(name.toUpperCase());
}

function print(name, callbackFun){
    console.log(name);
    callbackFun(name);
}

print('imtiaz', callbackFun);


//object 

var person = {};
person.name = 'imtiaz';
person.age = 24;

console.log(person);

var person = {         //different way 
    name: 'imtiaz',
    age: 24,
    skills: ['c++', 'c#']
};

for(var i in person){        // travarse object
    console.log(person[i]);
}


//underscore
var arr = [2,3,4,5];

_.each(arr, function(item){
    console.log(item);
});

//Inner Function 

function add(a, b)
{
    function sum()
    {
        return a+b;
    }

    function sub()
    {
        return a-b;
    }

    return sum() + sub();
}

console.log("Inner Function example: %d",add(4,2));

//clouser 

var name = 'imtiaz';

function Hello()
{
    console.log('hello '+ name); 
}

Hello();

 // Reduce 

 var arr = [1, 2, 3, 4];

 var result = arr.reduce(function(a, b){
    return a+b;
 });


 //promise 

 var promiseVar = control => {
     return new Promise((resolve, reject) => { 
        setInterval(() =>{
            if(control)
                resolve('simple success data');
            else 
                reject('simple error data');
            }, 100)
     })
 }

 promiseVar(false)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

 