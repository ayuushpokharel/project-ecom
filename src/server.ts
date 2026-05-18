import app from "./app";
import connectDatabase from "./config/db.config";
import ENV_CONFIG from "./config/env.config";
const PORT = ENV_CONFIG.port;
const DB_URI = ENV_CONFIG.db_uri;

//! connect database
connectDatabase(DB_URI);

//! listening on port
app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
    console.log("Press CTRL + C to close the server");
});
