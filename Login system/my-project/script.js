// const loginForm = document.getElementById("login-form");
// const loginButton = document.getElementById("login-form-submit");
// const loginErrorMsg = document.getElementById("login-error-msg");

// loginButton.addEventListener("click", (e) => {
//     e.preventDefault();
//     const username = loginForm.username.value;
//     const password = loginForm.password.value;

//     if (username === "user" && password === "web_dev") {
//         alert("You have successfully logged in.");
//         location.reload();
//     } else {
//         loginErrorMsg.style.opacity = 1;
//     }
// })














const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

const usernameInput = loginForm.username;
const passwordInput = loginForm.password;

// 2. LOGIN CREDENTIALS

const validUser = {
    username: "user",
    password: "web_dev"
};

// 3. LOGIN ATTEMPT COUNTER


let loginAttempts = 0;
const maxAttempts = 5;



// 4. FORM SUBMIT EVENT

loginForm.addEventListener("submit", (e) => {

    // Stop browser from refreshing the page
    e.preventDefault();


    
    // 5. GET USER INPUT


    const username = usernameInput.value.trim();
    const password = passwordInput.value;


    
    // 6. CLEAR PREVIOUS ERROR
    

    loginErrorMsg.textContent = "";
    loginErrorMsg.style.opacity = "0";


    
    // 7. EMPTY FIELD VALIDATION
  

    if (username === "" || password === "") {

        showError("Please enter username and password.");

        return;
    }


\    // 8. CHECK MAXIMUM ATTEMPTS

    if (loginAttempts >= maxAttempts) {

        showError("Too many failed attempts. Please try again later.");

        return;
    }


    // 9. LOADING STATE
   

    loginButton.disabled = true;
    loginButton.textContent = "Logging in...";


    // Simulate server request
    setTimeout(() => {

       
        // 10. CHECK LOGIN
      

        if (
            username === validUser.username &&
            password === validUser.password
        ) {

            // ===============================
            // 11. SUCCESS
            // ===============================

            loginAttempts = 0;

            // Store login session
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("username", username);

            alert("You have successfully logged in!");

            // Redirect to dashboard
            window.location.href = "dashboard.html";

        } else {

            // ===============================
            // 12. FAILED LOGIN
            // ===============================

            loginAttempts++;

            const remainingAttempts =
                maxAttempts - loginAttempts;

            if (remainingAttempts > 0) {

                showError(
                    `Invalid username or password. ${remainingAttempts} attempt(s) remaining.`
                );

            } else {

                showError(
                    "Too many failed attempts. Please try again later."
                );
            }


            // Reset button
            loginButton.disabled = false;
            loginButton.textContent = "Login";

        }

    }, 1000);
});


// ===============================
// 13. ERROR FUNCTION
// ===============================

function showError(message) {

    loginErrorMsg.textContent = message;
    loginErrorMsg.style.opacity = "1";
}


// ===============================
// 14. CLEAR ERROR WHEN USER TYPES
// ===============================

usernameInput.addEventListener("input", () => {

    loginErrorMsg.style.opacity = "0";

});


passwordInput.addEventListener("input", () => {

    loginErrorMsg.style.opacity = "0";

});
```

### Now let's add password visibility

If your HTML has:

```html
<input type="password" id="password" name="password">

<button type="button" id="show-password">
    Show Password
</button>
const showPasswordButton =
    document.getElementById("show-password");

showPasswordButton.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        showPasswordButton.textContent = "Hide Password";

    } else {

        passwordInput.type = "password";
        showPasswordButton.textContent = "Show Password";

    }

});
```