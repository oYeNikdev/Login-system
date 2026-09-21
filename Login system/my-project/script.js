// // const loginForm = document.getElementById("login-form");
// // const loginButton = document.getElementById("login-form-submit");
// // const loginErrorMsg = document.getElementById("login-error-msg");

// // loginButton.addEventListener("click", (e) => {
// //     e.preventDefault();
// //     const username = loginForm.username.value;
// //     const password = loginForm.password.value;

// //     if (username === "user" && password === "web_dev") {
// //         alert("You have successfully logged in.");
// //         location.reload();
// //     } else {
// //         loginErrorMsg.style.opacity = 1;
// //     }
// // })














// const loginForm = document.getElementById("login-form");
// const loginButton = document.getElementById("login-form-submit");
// const loginErrorMsg = document.getElementById("login-error-msg");

// const usernameInput = loginForm.username;
// const passwordInput = loginForm.password;

// // 2. LOGIN CREDENTIALS

// const validUser = {
//     username: "user",
//     password: "web_dev"
// };

// // 3. LOGIN ATTEMPT COUNTER


// let loginAttempts = 0;
// const maxAttempts = 5;



// // 4. FORM SUBMIT EVENT

// loginForm.addEventListener("submit", (e) => {

//     // Stop browser from refreshing the page
//     e.preventDefault();


    
//     // 5. GET USER INPUT


//     const username = usernameInput.value.trim();
//     const password = passwordInput.value;


    
//     // 6. CLEAR PREVIOUS ERROR
    

//     loginErrorMsg.textContent = "";
//     loginErrorMsg.style.opacity = "0";


    
//     // 7. EMPTY FIELD VALIDATION
  

//     if (username === "" || password === "") {

//         showError("Please enter username and password.");

//         return;
//     }


// \    // 8. CHECK MAXIMUM ATTEMPTS

//     if (loginAttempts >= maxAttempts) {

//         showError("Too many failed attempts. Please try again later.");

//         return;
//     }


//     // 9. LOADING STATE
   

//     loginButton.disabled = true;
//     loginButton.textContent = "Logging in...";


//     // Simulate server request
//     setTimeout(() => {

       
//         // 10. CHECK LOGIN
      

//         if (
//             username === validUser.username &&
//             password === validUser.password
//         ) {

//             // ===============================
//             // 11. SUCCESS
//             // ===============================

//             loginAttempts = 0;

//             // Store login session
//             localStorage.setItem("isLoggedIn", "true");
//             localStorage.setItem("username", username);

//             alert("You have successfully logged in!");

//             // Redirect to dashboard
//             window.location.href = "dashboard.html";

//         } else {

//             // ===============================
//             // 12. FAILED LOGIN
//             // ===============================

//             loginAttempts++;

//             const remainingAttempts =
//                 maxAttempts - loginAttempts;

//             if (remainingAttempts > 0) {

//                 showError(
//                     `Invalid username or password. ${remainingAttempts} attempt(s) remaining.`
//                 );

//             } else {

//                 showError(
//                     "Too many failed attempts. Please try again later."
//                 );
//             }


//             // Reset button
//             loginButton.disabled = false;
//             loginButton.textContent = "Login";

//         }

//     }, 1000);
// });


// // ===============================
// // 13. ERROR FUNCTION
// // ===============================

// function showError(message) {

//     loginErrorMsg.textContent = message;
//     loginErrorMsg.style.opacity = "1";
// }


// // ===============================
// // 14. CLEAR ERROR WHEN USER TYPES
// // ===============================

// usernameInput.addEventListener("input", () => {

//     loginErrorMsg.style.opacity = "0";

// });


// passwordInput.addEventListener("input", () => {

//     loginErrorMsg.style.opacity = "0";

// });
// ```

// ### Now let's add password visibility

// If your HTML has:

// ```html
// <input type="password" id="password" name="password">

// <button type="button" id="show-password">
//     Show Password
// </button>
// const showPasswordButton =
//     document.getElementById("show-password");

// showPasswordButton.addEventListener("click", () => {

//     if (passwordInput.type === "password") {

//         passwordInput.type = "text";
//         showPasswordButton.textContent = "Hide Password";

//     } else {

//         passwordInput.type = "password";
//         showPasswordButton.textContent = "Show Password";

//     }

// });








// ===============================
// 1. ELEMENTS
// ===============================
// const loginForm = document.getElementById("login-form");
// const usernameInput = document.getElementById("username");
// const passwordInput = document.getElementById("password");
// const loginButton = document.getElementById("login-form-submit");
// const loginErrorMsg = document.getElementById("login-error-msg");
// const togglePasswordBtn = document.getElementById("toggle-password");
// const rememberMe = document.getElementById("remember-me");

// ===============================
// 2. SETTINGS
// ===============================
// Demo only: anyone can read these in the browser.
// A real login must be checked on a server.
// const validUser = {
//     username: "user",
//     password: "web_dev"
// };

// const MAX_ATTEMPTS = 5;
// const LOCKOUT_SECONDS = 30;
// const REDIRECT_URL = "dashboard.html";
// const LOCK_KEY = "lockUntil";

// let loginAttempts = 0;
// let lockTimer = null;

// ===============================
// 3. MESSAGE HELPERS
// ===============================
// function showMessage(text, type = "error") {
//     loginErrorMsg.textContent = text;
//     loginErrorMsg.className = type === "success" ? "show success" : "show";
// }

// function hideMessage() {
//     loginErrorMsg.textContent = "";
//     loginErrorMsg.className = "";
// }

// ===============================
// 4. LOCKOUT (survives page refresh)
// ===============================
// function startLockout(until) {
//     clearInterval(lockTimer);
//     loginButton.disabled = true;
//     showMessage("Too many failed attempts. Please try again later.");

//     const tick = () => {
//         const secondsLeft = Math.ceil((until - Date.now()) / 1000);

//         if (secondsLeft <= 0) {
//             clearInterval(lockTimer);
//             localStorage.removeItem(LOCK_KEY);
//             loginAttempts = 0;
//             loginButton.disabled = false;
//             loginButton.textContent = "Login";
//             hideMessage();
//             return;
//         }

//         loginButton.textContent = `Try again in ${secondsLeft}s`;
//     };

//     tick();
//     lockTimer = setInterval(tick, 1000);
// }

// If the page was refreshed during a lockout, resume it
// const savedLock = Number(localStorage.getItem(LOCK_KEY));
// if (savedLock > Date.now()) {
//     startLockout(savedLock);
// }

// ===============================
// 5. LOGIN RESULT HANDLERS
// ===============================
// function handleSuccess(username) {
//     loginAttempts = 0;

    // "Remember me" keeps the session after the browser closes
    // const storage = rememberMe.checked ? localStorage : sessionStorage;
    // storage.setItem("isLoggedIn", "true");
    // storage.setItem("username", username);

//     showMessage("Login successful. Redirecting...", "success");

//     setTimeout(() => {
//         window.location.href = REDIRECT_URL;
//     }, 1000);
// }

// function handleFailure() {
//     loginAttempts++;
//     passwordInput.value = "";
//     passwordInput.focus();

//     if (loginAttempts >= MAX_ATTEMPTS) {
//         const until = Date.now() + LOCKOUT_SECONDS * 1000;
//         localStorage.setItem(LOCK_KEY, until);
//         startLockout(until);
//         return;
//     }

//     const remaining = MAX_ATTEMPTS - loginAttempts;
//     showMessage(`Invalid username or password. ${remaining} attempt(s) remaining.`);

//     loginButton.disabled = false;
//     loginButton.textContent = "Login";
// }

// ===============================
// 6. FORM SUBMIT
// ===============================
// loginForm.addEventListener("submit", (e) => {
//     e.preventDefault();

    // Ignore submits while loading or locked out
    // if (loginButton.disabled) return;

    // const username = usernameInput.value.trim();
    // const password = passwordInput.value;

    // hideMessage();
    // usernameInput.classList.remove("invalid");
    // passwordInput.classList.remove("invalid");

    // Empty field validation
    // if (username === "" || password === "") {
    //     if (username === "") usernameInput.classList.add("invalid");
    //     if (password === "") passwordInput.classList.add("invalid");

    //     showMessage("Please enter your username and password.");
    //     (username === "" ? usernameInput : passwordInput).focus();
    //     return;
    // }

    // Loading state
    // loginButton.disabled = true;
    // loginButton.textContent = "Logging in...";

    // Simulate a server request
//     setTimeout(() => {
//         if (username === validUser.username && password === validUser.password) {
//             handleSuccess(username);
//         } else {
//             handleFailure();
//         }
//     }, 800);
// });

// ===============================
// 7. CLEAR ERROR WHEN USER TYPES
// ===============================
// [usernameInput, passwordInput].forEach((input) => {
//     input.addEventListener("input", () => {
//         input.classList.remove("invalid");
//         if (!loginButton.disabled) hideMessage();
//     });
// });

// ===============================
// 8. SHOW / HIDE PASSWORD
// ===============================
// togglePasswordBtn.addEventListener("click", () => {
//     const showing = passwordInput.type === "password";

//     passwordInput.type = showing ? "text" : "password";
//     togglePasswordBtn.textContent = showing ? "Hide" : "Show";
//     togglePasswordBtn.setAttribute("aria-label", showing ? "Hide password" : "Show password");
//     togglePasswordBtn.setAttribute("aria-pressed", String(showing));
// });

// ===============================
// 1. ELEMENTS
// ===============================
const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-form-submit");
const btnText = document.getElementById("btn-text");
const loginErrorMsg = document.getElementById("login-error-msg");
const togglePasswordBtn = document.getElementById("toggle-password");
const rememberMe = document.getElementById("remember-me");
const capsWarning = document.getElementById("caps-warning");
const forgotLink = document.getElementById("forgot-link");
const themeToggle = document.getElementById("theme-toggle");

// ===============================
// 2. SETTINGS
// ===============================
// Demo only: anyone can read these in the browser.
// A real login must be checked on a server.
const validUser = { username: "user", password: "web_dev" };

const MAX_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 30;
const REDIRECT_URL = "dashboard.html";
const LOCK_KEY = "lockUntil";

let loginAttempts = 0;
let lockTimer = null;

// ===============================
// 3. HELPERS
// ===============================
function showMessage(text, type = "error") {
    loginErrorMsg.textContent = text;
    loginErrorMsg.className = type; // error | success | info
}

function hideMessage() {
    loginErrorMsg.textContent = "";
    loginErrorMsg.className = "";
}

function setButton(label, disabled = false, loading = false) {
    btnText.textContent = label;
    loginButton.disabled = disabled;
    loginButton.classList.toggle("loading", loading);
}

function shake() {
    loginForm.classList.remove("shake");
    void loginForm.offsetWidth; // restart the animation
    loginForm.classList.add("shake");
}

// ===============================
// 4. LOCKOUT (survives page refresh)
// ===============================
function startLockout(until) {
    clearInterval(lockTimer);
    showMessage("Too many failed attempts. Please try again later.");

    const tick = () => {
        const secondsLeft = Math.ceil((until - Date.now()) / 1000);

        if (secondsLeft <= 0) {
            clearInterval(lockTimer);
            localStorage.removeItem(LOCK_KEY);
            loginAttempts = 0;
            setButton("Login");
            hideMessage();
            return;
        }

        setButton(`Try again in ${secondsLeft}s`, true);
    };

    tick();
    lockTimer = setInterval(tick, 1000);
}

const savedLock = Number(localStorage.getItem(LOCK_KEY));
if (savedLock > Date.now()) {
    startLockout(savedLock);
}

// ===============================
// 5. LOGIN RESULTS
// ===============================
function handleSuccess(username) {
    loginAttempts = 0;

    // "Remember me" keeps the session after the browser closes
    const storage = rememberMe.checked ? localStorage : sessionStorage;
    storage.setItem("isLoggedIn", "true");
    storage.setItem("username", username);

    showMessage("Login successful. Redirecting...", "success");

    setTimeout(() => {
        window.location.href = REDIRECT_URL;
    }, 1000);
}

function handleFailure() {
    loginAttempts++;
    passwordInput.value = "";
    passwordInput.focus();
    shake();

    if (loginAttempts >= MAX_ATTEMPTS) {
        const until = Date.now() + LOCKOUT_SECONDS * 1000;
        localStorage.setItem(LOCK_KEY, until);
        startLockout(until);
        return;
    }

    const remaining = MAX_ATTEMPTS - loginAttempts;
    showMessage(`Invalid username or password. ${remaining} attempt(s) remaining.`);
    setButton("Login");
}

// ===============================
// 6. FORM SUBMIT
// ===============================
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Ignore submits while loading or locked out
    if (loginButton.disabled) return;

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    hideMessage();
    usernameInput.classList.remove("invalid");
    passwordInput.classList.remove("invalid");

    if (username === "" || password === "") {
        if (username === "") usernameInput.classList.add("invalid");
        if (password === "") passwordInput.classList.add("invalid");

        showMessage("Please enter your username and password.");
        shake();
        (username === "" ? usernameInput : passwordInput).focus();
        return;
    }

    setButton("Logging in...", true, true);

    // Simulate a server request
    setTimeout(() => {
        if (username === validUser.username && password === validUser.password) {
            handleSuccess(username);
        } else {
            handleFailure();
        }
    }, 800);
});

// ===============================
// 7. EXTRAS
// ===============================
[usernameInput, passwordInput].forEach((input) => {
    input.addEventListener("input", () => {
        input.classList.remove("invalid");
        if (!loginButton.disabled) hideMessage();
    });
});

// Show / hide password
togglePasswordBtn.addEventListener("click", () => {
    const showing = passwordInput.type === "password";

    passwordInput.type = showing ? "text" : "password";
    togglePasswordBtn.textContent = showing ? "Hide" : "Show";
    togglePasswordBtn.setAttribute("aria-label", showing ? "Hide password" : "Show password");
    togglePasswordBtn.setAttribute("aria-pressed", String(showing));
});

// Caps Lock warning
passwordInput.addEventListener("keyup", (e) => {
    capsWarning.hidden = !e.getModifierState("CapsLock");
});
passwordInput.addEventListener("blur", () => {
    capsWarning.hidden = true;
});

// Forgot password (no reset page yet)
forgotLink.addEventListener("click", (e) => {
    e.preventDefault();
    showMessage("Password reset isn't set up in this demo yet.", "info");
});

// Light / dark theme (initial theme is set by the script in <head>)
themeToggle.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
});