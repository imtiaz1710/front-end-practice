let h1 = document.getElementById("my-h1");
h1.innerHTML = "This is my new header!";

// change background color of a header
let btn = document.getElementById('my-btn');
let i = 0;
let color = ['red', 'green', 'blue', 'pink'];

btn.addEventListener('click', function() {
    // alert('Working btn')   
    // h1.innerText = "This is another new header!"      
    h1.style.background = color[i];

    if(i >= color.length){
        i = 0;
    }
    else{
        i++;
    }              
})

//query selctior
let container = document.querySelector('.container');
container.style.background = 'wheat';

//shortcut for style changing of html by js
function $(selector) {
    return document.querySelector(selector)
}

let h1Styles = {
    padding : '20px',
    margin:  '4px',
    color: 'white'
}

let myBtnStyles = {
    padding: '20px',
    margin: '20px',
}
Object.assign(h1.style, h1Styles)
Object.assign($('#my-btn').style, myBtnStyles)

