import "dotenv/config";
const ENV_CONFIG = {
    port: process.env.PORT!!,
    node_env: process.env.NODE_ENV,
    db_uri: process.env.DB_URI!!,
};
export default ENV_CONFIG;
