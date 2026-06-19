function shopNow(){
    window.location.href="products.html";
}

let buttons = document.querySelectorAll(".product button");

buttons.forEach(button=>{

button.addEventListener("click",function(){

alert("Item added to cart!");

});

});
let images=[
"images/hero1.jpg",
"images/hero2.jpg",
"images/hero3.jpg"
];

let current=0;

function changeHero(){

current++;

if(current>=images.length){
current=0;
}

document.querySelector(".hero").style.backgroundImage=
`url(${images[current]})`;

}

setInterval(changeHero,4000);