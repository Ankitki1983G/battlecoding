// Toggle Login / Signup
var signupBtn = document.querySelector(".signup-btn");
var loginBtn = document.querySelector(".login-btn");
var loginBox = document.querySelector(".login-box");
var signupBox = document.querySelector(".signup-box");

signupBtn && (signupBtn.onclick = function () {
    signupBox.classList.add("active");
    loginBox.classList.remove("active");
    loginBtn.classList.remove("d-none");
    signupBtn.classList.add("d-none");
});

loginBtn && (loginBtn.onclick = function () {
    signupBox.classList.remove("active");
    loginBox.classList.add("active");
    loginBtn.classList.add("d-none");
    signupBtn.classList.remove("d-none");
});

// Signup
var signupForm = document.querySelector(".signup-form");
signupForm && (signupForm.onsubmit = function (e) {
    e.preventDefault();

    var inputs = signupForm.querySelectorAll("input");
    var textarea = signupForm.querySelector("textarea");
    var contact = document.querySelector("#contact").value.trim();

    if (!/^[0-9]{10}$/.test(contact)) {
        alert("Enter valid 10-digit mobile number");
        return;
    }

    var userData = {
        name: inputs[0].value.trim(),
        contact: contact,
        address: textarea.value.trim(),
        username: inputs[2].value.trim(),
        password: inputs[3].value
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    alert("✅ Registration Successful!");
    signupForm.reset();

    signupBox.classList.remove("active");
    loginBox.classList.add("active");
    loginBtn.classList.add("d-none");
    signupBtn.classList.remove("d-none");
});

// "Student Login form" link par click hone par form toggle kare
var studentLoginLinks = document.querySelectorAll(".std.login");

studentLoginLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        // Agar signup box active hai → login box show kare
        if (signupBox.classList.contains("active")) {
            signupBox.classList.remove("active");
            loginBox.classList.add("active");

            loginBtn.classList.add("d-none");
            signupBtn.classList.remove("d-none");
        }
        // Agar login box active hai → signup box show kare
        else {
            signupBox.classList.add("active");
            loginBox.classList.remove("active");

            loginBtn.classList.remove("d-none");
            signupBtn.classList.add("d-none");
        }
    });
});


// Login (Direct, No OTP)
var loginForm = document.querySelector(".login-form");
loginForm && (loginForm.onsubmit = function (e) {
    e.preventDefault();

    var username = document.querySelector(".login-username").value.trim();
    var password = document.querySelector(".login-password").value;
    var savedUser = JSON.parse(localStorage.getItem("userData"));

    if (!savedUser) {
        alert("No user found! Please register first.");
        return;
    }

    if (username === savedUser.username && password === savedUser.password) {
       localStorage.setItem("loggedInUser", username);
        alert("🎉 Login Successful!");
        loginForm.reset();
        window.location.href = "/main content/main_contant.html";
    } else {
        alert("❌ Invalid username or password!");
    }
});
