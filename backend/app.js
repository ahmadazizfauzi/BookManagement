const express = require("express");
const path = require("path");
const cors = require("cors");
const bookRoutes = require("./src/routes/bookRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const bookCategoriesRoutes = require("./src/routes/bookCategoriesRoutes"); // Tambahkan ini
const appConfig = require("./src/config/appConfig"); 

const app = express();
const port = appConfig.port; 

app.use(cors());
app.use(express.json());

// Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, "public")));

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// Use routes
app.use("/api", bookRoutes);
app.use("/api", categoryRoutes);
app.use("/api", bookCategoriesRoutes); // Tambahkan ini

// Start server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
