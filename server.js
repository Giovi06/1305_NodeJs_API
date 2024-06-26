require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOption = require("./config/corsOptions");
const { logger } = require("./middleware/LogEvents");
const errorHandler = require("./middleware/errorHandler");
const { error } = require("console");
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 8080;

//connect to database
connectDB();

//custom middleware logger
app.use(logger);

//Handle options credentials check - before CORS
//fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOption));

// built-in middleware to handle urlencoded data
// in other words, form data:
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

//routess
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));
//default /all
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  }
  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
