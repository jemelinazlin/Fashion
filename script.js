
// SHOP NOW BUTTON

function shopNow() {
    window.location.href = "products.html";
}

// WELCOME MESSAGE

window.onload = function () {
    alert("Welcome to ZURI Clothing!");
};

// ADD TO CART

let cartButtons = document.querySelectorAll(".product button:first-of-type");

cartButtons.forEach(function(button){

    button.addEventListener("click",function(){

        alert("Item added to cart!");

    });

});

// WISHLIST

let wishButtons = document.querySelectorAll(".product button:last-of-type");

wishButtons.forEach(function(button){

    button.addEventListener("click",function(){

        alert("Added to wishlist!");

    });

});

// SEARCH

let search = document.getElementById("search");

if(search){

search.addEventListener("keyup",function(){

let value = search.value.toLowerCase();

let products = document.querySelectorAll(".product");

products.forEach(function(product){

let text = product.innerText.toLowerCase();

if(text.indexOf(value) > -1){

product.style.display = "block";

}

else{

product.style.display = "none";

}

});

});

}

// NEWSLETTER

let subscribe = document.querySelector(".newsletter button");

if(subscribe){

subscribe.addEventListener("click",function(){

let email = document.querySelector(".newsletter input").value;

if(email==""){

alert("Please enter your email.");

}

else{

alert("Thank you for subscribing!");

}

});

}

// CATEGORY HOVER EFFECT

let cards = document.querySelectorAll(".card");

cards.forEach(function(card){

card.addEventListener("click",function(){

alert("Explore our "+card.innerText+" collection!");

});

});
function continueShopping(){

window.location.href="products.html";

}

function checkout(){

alert("Thank you for shopping with ZURI!");

}
