// Purpose: Main server file for the application
const express = require("express");
const app = express();
// port for heroku
const PORT = process.env.PORT || 3001;
// routes
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
// middleware for parsing json and urlencoded form data 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// use apiRoutes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);
// listen on port to start server
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));