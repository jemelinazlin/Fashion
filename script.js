// SHOP NOW
// SWEETALERT HELPER
function showAlert(title, text, icon) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonColor: "#000",
        background: "#fff",
        color: "#333"
    });
}
function shopNow() {
    window.location.href = "products.html";
}

// SEARCH
document.addEventListener("DOMContentLoaded", function () {
    let search = document.getElementById("search");

    if (search) {
        search.addEventListener("keyup", function () {
            let value = search.value.toLowerCase();
            let products = document.querySelectorAll(".product");

            products.forEach(function (product) {
                let text = product.innerText.toLowerCase();

                product.style.display = text.includes(value) ? "block" : "none";
            });
        });
    }
});

// NEWSLETTER
document.addEventListener("DOMContentLoaded", function () {
    let subscribe = document.querySelector(".newsletter button");

    if (subscribe) {
        subscribe.addEventListener("click", function () {
            let emailInput = document.querySelector(".newsletter input");

            if (!emailInput) return;

            let email = emailInput.value.trim();

            if (email === "") {
                alert("Please enter your email.");
            } else {
                alert("Thank you for subscribing!");
            }
        });
    }
});

// CATEGORY
document.addEventListener("DOMContentLoaded", function () {
    let cards = document.querySelectorAll(".card");

    cards.forEach(function (card) {
        card.addEventListener("click", function () {
            alert("Explore our " + card.innerText + " collection!");
        });
    });
});

// ADD TO CART
function addCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({ name, price: Number(price) });

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCounters();

    showAlert("Added to Cart!", name + " has been added to your cart.", "success");
}

// ADD TO WISHLIST
function addWish(name, price) {
    let wish = JSON.parse(localStorage.getItem("wish")) || [];

    wish.push({ name, price: Number(price) });

    localStorage.setItem("wish", JSON.stringify(wish));

    updateCounters();

    showAlert("Added to Wishlist!", name + " has been added to your wishlist.", "success");
}

// SHOW CART
document.addEventListener("DOMContentLoaded", function () {
    let box = document.getElementById("cartItems");

    if (box) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let total = 0;

        box.innerHTML = ""; // prevent duplication bug

        cart.forEach(function (item, index) {
            total += Number(item.price);

            box.innerHTML += `
                <div class="product">
                    <h3>${item.name}</h3>
                    <p>$${item.price}</p>
                    <button onclick="removeCart(${index})">Remove</button>
                </div>
            `;
        });

        let totalBox = document.getElementById("total");
        if (totalBox) {
            totalBox.innerHTML = "Total: $" + total;
        }
    }
});

// REMOVE CART
function removeCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();
}

// SHOW WISHLIST
document.addEventListener("DOMContentLoaded", function () {
    let box = document.getElementById("wishItems");

    if (box) {
        let wish = JSON.parse(localStorage.getItem("wish")) || [];

        box.innerHTML = "";

        wish.forEach(function (item, index) {
            box.innerHTML += `
                <div class="product">
                    <h3>${item.name}</h3>
                    <p>$${item.price}</p>
                    <button onclick="wishToCart(${index})">Add to Cart</button>
                    <button onclick="removeWishItem(${index})">Remove</button>
                </div>
            `;
        });
    }
});

// REMOVE WISH ITEM
function removeWishItem(index) {
    let wish = JSON.parse(localStorage.getItem("wish")) || [];

    wish.splice(index, 1);

    localStorage.setItem("wish", JSON.stringify(wish));

    location.reload();
}

// MOVE WISH → CART
function wishToCart(index) {
    let wish = JSON.parse(localStorage.getItem("wish")) || [];
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (wish[index]) {
        cart.push(wish[index]);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCounters();

    alert("Added to cart!");
}

// COUNTERS
function updateCounters() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let wish = JSON.parse(localStorage.getItem("wish")) || [];

    let cartCount = document.getElementById("cartCount");
    let wishCount = document.getElementById("wishCount");

    if (cartCount) cartCount.innerHTML = cart.length;
    if (wishCount) wishCount.innerHTML = wish.length;
}

// NAV FUNCTIONS
function continueShopping() {
    window.location.href = "products.html";
}

function checkout() {

    if (localStorage.getItem("loggedIn") !== "true") {

        alert("Please login before proceeding to checkout.");
        window.location.href = "login.html";
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

  showAlert(
    "Order Confirmed!",
    "Thank you for shopping with ZURI.",
    "success"
);

    localStorage.removeItem("cart");

    updateCounters();

    window.location.reload();
}

function clearCart() {
    localStorage.removeItem("cart");
    location.reload();
}

function clearWishlist() {
    localStorage.removeItem("wish");
    location.reload();
}

function sendMessage() {
showAlert(
    "Message Sent!",
    "Thank you for contacting ZURI. We will get back to you soon.",
    "success"
);

}

function login() {

    let email = document.getElementById("email").value.trim();

    let password = document.getElementById("password").value;

    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
showAlert("Login Failed", "Invalid email or password.", "error");

        window.location.href = "signup.html";

        return;

    }

    if (email === user.email && password === user.password) {

        localStorage.setItem("loggedIn", "true");

        showAlert("Welcome Back!", "Login successful.", "success");
        window.location.href = "cart.html";

    } else {

        alert("Invalid email or password.");

    }

}
function signup() {

    let name = document.getElementById("name").value.trim();

    let email = document.getElementById("email").value.trim();

    let password = document.getElementById("password").value;

    if (name === "" || email === "" || password === "") {

        alert("Please fill in all fields.");

        return;

    }

    let user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("user", JSON.stringify(user));

Swal.fire({
    title: "Welcome Back!",
    text: "Login successful.",
    icon: "success",
    confirmButtonColor: "#000"
}).then(() => {
    window.location.href = "cart.html";
});

    window.location.href = "login.html";

}
document.addEventListener("DOMContentLoaded", function () {

    let user = JSON.parse(localStorage.getItem("user"));
    let loggedIn = localStorage.getItem("loggedIn");
    let welcome = document.getElementById("welcomeUser");

    if (welcome && user && loggedIn === "true") {

        welcome.innerHTML = "Hi, " + user.name;

    }

});
document.addEventListener("DOMContentLoaded", function () {

    updateCounters();

    let user = JSON.parse(localStorage.getItem("user"));
    let loggedIn = localStorage.getItem("loggedIn");
    let welcome = document.getElementById("welcomeUser");

    if (welcome) {

        if (loggedIn === "true" && user) {

            welcome.innerHTML = "Hi, " + user.name;

        } else {

            welcome.innerHTML =
                '<a href="login.html">Login</a> | <a href="signup.html">Sign Up</a>';

        }

    }

});
document.addEventListener("DOMContentLoaded", function () {

    let logout = document.getElementById("logoutLink");

    if (logout) {

        let loggedIn = localStorage.getItem("loggedIn");

        logout.style.display =
            loggedIn === "true" ? "inline" : "none";

    }

});
// Load saved theme
document.addEventListener("DOMContentLoaded", function () {

    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark-mode");

        let btn = document.getElementById("darkModeBtn");

        if (btn) {
            btn.innerHTML = "☀️";
        }
    }

});

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

    let btn = document.getElementById("darkModeBtn");

    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem("theme", "dark");

        if (btn) {
            btn.innerHTML = "☀️";
        }

    } else {

        localStorage.setItem("theme", "light");

        if (btn) {
            btn.innerHTML = "🌙";
        }

    }

}
function logout() {

    localStorage.removeItem("loggedIn");

    let welcome = document.getElementById("welcomeUser");

    if (welcome) {
        welcome.innerHTML =
            '<a href="login.html">Login</a> | <a href="signup.html">Sign Up</a>';
    }

    let logoutBtn = document.getElementById("logoutLink");

    if (logoutBtn) {
        logoutBtn.style.display = "none";
    }

    updateCounters();

    Swal.fire({
        title: "Logged Out",
        text: "You have been logged out successfully.",
        icon: "success",
        confirmButtonColor: "#000"
    }).then(() => {
        window.location.href = "index.html";
    });

}