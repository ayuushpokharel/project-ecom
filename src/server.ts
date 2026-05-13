import app from "./app";
import connectDatabase from "./config/db.config";

const PORT = 8080;
const DB_URI = "mongodb://localhost:27017/e-com";

//! connect database
connectDatabase(DB_URI);

//! listening port
app.listen(PORT, () => {
  console.log(`Server is up & running at http://localhost:${PORT}`);
  console.log("Press CTRL + C to close the server");
});
