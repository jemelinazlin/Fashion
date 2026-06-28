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
                showAlert("Please enter your email.");
            } else {
                showAlert(
    "Subscribed!",
    "Thank you for subscribing to ZURI.",
    "success"
);
            }
        });
    }
});

// CATEGORY
document.addEventListener("DOMContentLoaded", function () {
    let cards = document.querySelectorAll(".card");

    cards.forEach(function (card) {
        card.addEventListener("click", function () {
            showAlert(
    "Category",
    "Explore our " + card.innerText + " collection!",
    "info"
);
        });
    });
});

// ADD TO CART
function addCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name: name,
        price: Number(price),
        image: image
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCounters();

   showAlert(
    "Added to Cart!",
    name + " moved to your cart.",
    "success"
    );
}

// ADD TO WISHLIST
function addWish(name, price, image) {
    let wish = JSON.parse(localStorage.getItem("wish")) || [];

    wish.push({
        name: name,
        price: Number(price),
        image: image
    });

    localStorage.setItem("wish", JSON.stringify(wish));

    updateCounters();

    showAlert(
        "Added to Wishlist!",
        name + " has been added to your wishlist.",
        "success"
    );
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

            <img src="${item.image}" alt="${item.name}" class="cart-image">

            <div class="cart-details">
                <h3>${item.name}</h3>
                <p>Ksh ${item.price}</p>

                <button onclick="removeCart(${index})">
                    Remove
                </button>
            </div>

        </div>
    `;
});

        let totalBox = document.getElementById("total");
        if (totalBox) {
            totalBox.innerHTML =
"Total: Ksh " + (total).toLocaleString();
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

wish.forEach(function(item, index) {

    box.innerHTML += `
<div class="col-md-6 col-lg-4">

    <div class="card h-100 shadow-sm">

        <img src="${item.image}"
             class="card-img-top"
             alt="${item.name}">

        <div class="card-body text-center">

            <h5 class="card-title">${item.name}</h5>

            <p class="fw-bold">
                Ksh ${(item.price).toLocaleString()}
            </p>

            <button class="btn btn-dark w-100 mb-2"
                    onclick="wishToCart(${index})">
                Add to Cart
            </button>

            <button class="btn btn-outline-danger w-100"
                    onclick="removeWishItem(${index})">
                Remove
            </button>

        </div>

    </div>

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

    showAlert("Added to cart!");
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
        showAlert("Please login before proceeding to checkout.");
        window.location.href = "login.html";
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        showAlert("Your cart is empty.");
        return;
    }

    Swal.fire({
        title: "Order Confirmed!",
        text: "Thank you for shopping with ZURI.",
        icon: "success",
        confirmButtonColor: "#000"
    }).then(() => {

        localStorage.removeItem("cart");
        updateCounters();

        window.location.href = "index.html"; // better than reload
    });
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

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showAlert(
            "Invalid Email",
            "Please enter a valid email address.",
            "error"
        );
        return;
    }

    if (password === "") {
        showAlert(
            "Password Required",
            "Please enter your password.",
            "warning"
        );
        return;
    }

    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        showAlert(
            "No Account Found",
            "Please sign up first.",
            "error"
        ).then(() => {
            window.location.href = "signup.html";
        });
        return;
    }

    if (email === user.email && password === user.password) {

        localStorage.setItem("loggedIn", "true");

        Swal.fire({
            icon: "success",
            title: "Welcome Back!",
            text: "Login successful.",
            confirmButtonColor: "#000"
        }).then(() => {
            window.location.href = "cart.html";
        });

    } else {

        showAlert(
            "Login Failed",
            "Incorrect email or password.",
            "error"
        );

    }
}
function signup() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;

    // Name
    if (name === "") {
        showAlert("Invalid Name", "Please enter your full name.", "warning");
        return;
    }

    // Email format
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showAlert(
            "Invalid Email",
            "Please enter a valid email address (example@gmail.com).",
            "error"
        );
        return;
    }

    // Password length
    if (password.length < 8) {
        showAlert(
            "Weak Password",
            "Password must contain at least 8 characters.",
            "warning"
        );
        return;
    }

    // Uppercase
    if (!/[A-Z]/.test(password)) {
        showAlert(
            "Weak Password",
            "Password must contain at least one uppercase letter.",
            "warning"
        );
        return;
    }

    // Lowercase
    if (!/[a-z]/.test(password)) {
        showAlert(
            "Weak Password",
            "Password must contain at least one lowercase letter.",
            "warning"
        );
        return;
    }

    // Number
    if (!/[0-9]/.test(password)) {
        showAlert(
            "Weak Password",
            "Password must contain at least one number.",
            "warning"
        );
        return;
    }

    let user = {
        name,
        email,
        password
    };

    localStorage.setItem("user", JSON.stringify(user));

    Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Your account has been created successfully.",
        confirmButtonColor: "#000"
    }).then(() => {
        window.location.href = "login.html";
    });
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
function viewProduct(name, price, image) {

    let product = {
        name: name,
        price: price,
        image: image
    };

    localStorage.setItem("selectedProduct", JSON.stringify(product));

    window.location.href = "product.html";
}
// PRODUCT DETAILS PAGE
document.addEventListener("DOMContentLoaded", function () {

    // Only run on product.html
    let productImage = document.getElementById("productImage");
    let productName = document.getElementById("productName");
    let productPrice = document.getElementById("productPrice");
    let cartBtn = document.getElementById("cartBtn");
    let wishBtn = document.getElementById("wishBtn");

    // If this isn't product.html, stop
    if (!productImage || !productName || !productPrice) {
        return;
    }

    let product = JSON.parse(localStorage.getItem("selectedProduct"));

    if (!product) {
        window.location.href = "products.html";
        return;
    }

    // Display product information
    productImage.src = product.image;
    productImage.alt = product.name;

    productName.innerHTML = product.name;
    productPrice.innerHTML =
"Ksh " + (product.price).toLocaleString();

    // Add to Cart
    if (cartBtn) {
        cartBtn.addEventListener("click", function () {
            addCart(product.name, product.price, product.image);
        });
    }

    // Add to Wishlist
    if (wishBtn) {
        wishBtn.addEventListener("click", function () {
            addWish(product.name, product.price, product.image);
        });
    }

});