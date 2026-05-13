import app from "./app";
import connectDatabase from "./config/db.config";
const PORT = 8080;
const DB_URI = "mongodb://localhost:27017/project_ecom";

//! connect database
connectDatabase(DB_URI);

//! listening on port
app.listen(PORT, () => {
    console.log(`server is running at http://loclhost:${PORT}`);
    console.log("Press CTRL + C to close the server");
});
