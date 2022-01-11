
////es6

////map

// var colors = ['red', 'green', 'blue'];

// var modifiedColors = colors.map((value) => 'lite ' + value);

// console.log(colors);
// console.log(modifiedColors);


////const 
// const myConst = 1;

// myConst = 3;


// const Printer = {  
//     name : 'Hp',
//     print: function(){} //old syntax
// }

// const Printer = { 
//     name : 'Hp',
//     print(){}        //new syntax
// }




// var age = 24;
// person = {name: 'imtiaz', age}

// console.log(person);


/*................object + prototype............*/
// var roles = { 
//    type: "Admin",
//    displayType : function() {  
//       console.log(this.type); 
//    } 
// }  

// var super_role = Object.create(roles); 
// super_role.displayType(); 

// console.log(super_role.type)
// console.log(Object.getPrototypeOf(super_role));

// var guest_role = Object.create(roles); 
// guest_role.type = "Guest"; 
// guest_role.displayType(); 



// function x(){
//    this.a = '3';
// }

// x.prototype = {
//    sss : 3
// }

// var xx = new x();

// console.log(xx)

////this

// const person = 
// {
//    walk(){
//       console.log(this);
//    }
// }

// var walk = person.walk;
// walk();


/////object distruction

// const add = {
//    street : 'fdf',
//    road : 'fdfdf'
// }

// const {street : st, road } = add;
// st;


///////spread operator

// var x = [3,4,2];
// var y = [45,23,22]
// var z = [...x, ...y]

// var x = {name : '33'}
// var y = {name : 4}
// var z = {...x, ...y}


///array.form()

// var x = 'abacdfdf';
// var y = Array.from(x);

// let myFunction = (value) => value > 10;

// const numbers = [2, 4, 22, 13, 1];
// let result = numbers.findIndex(myFunction);

'use strict'

var name =  33;
age = 3;



