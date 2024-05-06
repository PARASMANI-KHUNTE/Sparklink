// Function to fetch user details and display them on the home page
async function fetchUserDetails() {
    const response = await fetch("/user");
    if (response.ok) {
      const user = await response.json();
      document.getElementById("username").innerText = user.username;
      document.getElementById("fullname").innerText = user.fullname;
      document.getElementById("email").innerText = user.email;
      document.getElementById("phoneNo").innerText = user.phoneNo;
    } else {
      alert("Failed to fetch user details. Please try again later.");
    }
  }
  
  
  // Function to handle successful login
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
  
    if (response.ok) {
      alert("Login successful");
      // Redirect to home page after successful login
      window.location.href = "/home.html";
      // Fetch and display user details on the home page
      fetchUserDetails();
    } else {
      alert("Login failed. Please check your username and password.");
    }
  }
  