let passLabel = document.getElementById("inputPassword6");
let eyeps = document.getElementById("eyebtn");
let clicked = false;
function showPassword(){
    if(!clicked){
        passLabel.setAttribute("type","password");
        eyeps.className = "fa-solid fa-eye";
        clicked = true;
    }else{
        passLabel.setAttribute("type","text");
        eyeps.className = "fa-solid fa-eye-slash";
        clicked = false;
    }
}



let passwordlen = false;
let pasd = document.getElementById("inputPassword6");
let ShowPanel = document.getElementById("passwordHelpInline");
let logbtn = document.getElementById("logbtn");
let min = 8;
let max = 20;
function checkPsdLen(){
    if (pasd.value.length >= min ){
        if (pasd.value.length <= max){
            passwordlen = true;
            logbtn.removeAttribute("disabled");

            ShowPanel.innerHTML =" ";
        }else{
            ShowPanel.innerHTML = "Please enter maxinum 20 char";
            logbtn.setAttribute("disabled" , true)
        }
    }else{
        ShowPanel.innerHTML = "Please Enter minimum 8 char";
    }
}



let username = document.getElementById("username");
function handellogin(){
    if(passwordlen){
        console.log(username.value);
        console.log(pasd.value);
    }else{
        console.log("Password must be of 8-20 characters");
    }
    
}


let loginf = false;
let loginform = document.getElementById("loginform");
let loginbtn = document.getElementById("lgbtn");
function loginFormShow(){
    if(!loginf){
        loginform.style.display = "none";
        signupform.style.display = "block";
        loginbtn.innerHTML ="LOGIN";
        loginf = true;
    }else{
        loginform.style.display = "block";
        signupform.style.display = "none";
        loginbtn.innerHTML ="SIGNUP";
        loginf = false ;
    }
}




let signpass = document.getElementById("signpass");
let resignpass = document.getElementById("resignpass");
let eyesbtn = document.getElementById("eyesbtn");
let isclicked = false;
function showPass(){
    if(!isclicked){
        signpass.setAttribute("type","password");
        resignpass.setAttribute("type","password");
        eyesbtn.className = "fa-solid fa-eye";
        isclicked = true;
    }else{
        signpass.setAttribute("type","text");
        resignpass.setAttribute("type","text");
        eyesbtn.className = "fa-solid fa-eye-slash";
        isclicked = false;
    }
}

let button = document.getElementById("signupButton");
let signupHelp = document.getElementById("signupHelp");
function checkLen(){
    if(signpass.value.length >= min){
        if(signpass.value.length <= max){
            if(signpass.value == resignpass.value){
                signupHelp.innerHTML = " ";
                button.removeAttribute("disabled");
            }else{
                signupHelp.innerHTML = "password does not match";
                button.setAttribute("disabled", true);
            }
        }else{
            signupHelp.innerHTML = "Please enter maxinum 20 char";
        }
    }else{
        signupHelp.innerHTML = "Please enter minimum 8 char";
    }
}

function test(){
    console.log("Working");
}

// Function to handle signup
async function signup() {
    const username = document.getElementById("susername").value;
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const phoneNo = document.getElementById("phoneNo").value;
    const password = document.getElementById("signpass").value;
    
    const response = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, fullname, email, phoneNo, password })
    });
  
    const data = await response.json();
    console.log(data);
  
    // Check if signup was successful and redirect to login page
    if (response.ok) {
      alert("Signup successful. Please log in.");
      // Redirect to login page
      loginFormShow();
    } else {
      alert("Signup failed. Please try again.");
    }
  }


  
  
// Function to handle login
async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("inputPassword6").value;
    
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });
  
    const data = await response.json();
    console.log(data);
  
    // Check if login was successful and redirect
    if (response.ok) {
      window.location.href = data.redirect;
    } else {
      alert("Login failed. Please try again.");
    }
  }
  
  
  // Function to handle logout
  async function logout() {
    const response = await fetch("/logout", {
      method: "POST"
    });
  
    const data = await response.json();
    console.log(data);
  }
  
  // Attach event listeners
  document.getElementById("signupButton").addEventListener("click", signup);
  document.getElementById("logbtn").addEventListener("click", login);
  
