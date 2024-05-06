const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const PORT = process.env.PORT || 3000;
const session = require("express-session");
const { MongoClient } = require("mongodb");
const MongoDBStore = require("connect-mongodb-session")(session);

const uri = process.env.MONGODB_URI;
const dbname = "sparklink";
const client = new MongoClient(uri);
const store = new MongoDBStore({
  uri: uri,
  databaseName: dbname,
  collection: "sessions"
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas', err);
  }
}

connectToDatabase();

// // Initialize session middleware
app.use(session({
  secret: process.env.secretPs,
  resave: false,
  saveUninitialized: false,
  store: store
}));

// // Serve static files from the 'public' directory

app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"public","scripts")));

// Parse JSON bodies
app.use(express.json());

app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,"public","templates","landingPage.html"));
});

app.get("/index",(req,res)=>{
  res.sendFile(path.join(__dirname,"public","templates","index.html"));
})

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "templates", "home.html"));
});

app.get("/index.html", (req, res) => {
  res.redirect("/"); // Redirect to the root URL
});
app.get("/landingPage", (req, res) => {
  res.redirect("/"); // Redirect to the root URL
});



// Signup endpoint
app.post("/signup", async (req, res) => {
  const { username, fullname, email, phoneNo, password } = req.body;
  
  // Check if user already exists
  const db = client.db(dbname);
  const users = db.collection("users");
  const existingUser = await users.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: "Username already exists" });
  }

  // Insert new user
  try {
    await users.insertOne({ username, fullname, email, phoneNo, password });
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists and password matches
  const db = client.db(dbname);
  const users = db.collection("users");
  const user = await users.findOne({ username, password });
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  // Set session data
  req.session.user = user;
  
  // Send back a success message with redirect URL
  res.json({ message: "Login successful", redirect: "/home" });

});


// Logout endpoint
app.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logout successful" });
});


// Endpoint to fetch user details
app.get("/user", async (req, res) => {
  // Check if the user is logged in
  if (!req.session.user) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  // If user is authenticated, send back user details
  const user = req.session.user;
  res.json({
    username: user.username,
    fullname: user.fullname,
    email: user.email,
    phoneNo: user.phoneNo
  });
});


// Start the server
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
