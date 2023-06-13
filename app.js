import express from "express";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";
import path from "path";
import { db } from "./config/db.js";
// import { Gig } from "./models/Gig.js";
// import { router } from "./routes/gigs.js";
const __dirname = path.resolve();

//test db
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

const app = express();

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//set a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
