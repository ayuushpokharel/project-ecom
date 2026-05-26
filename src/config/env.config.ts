import "dotenv/config";
const ENV_CONFIG = {
  //* port
  port: process.env.PORT!!,
  node_env: process.env.NODE_ENV,

  //* database
  db_uri: process.env.DB_URI!!,

  //* jwt
  jwt_secret: process.env.JWT_SECRET!!,
  jwt_expiry: process.env.JWT_EXPIRY!!,

  //* cloudinary
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME!!,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY!!,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET!!,

  //* cookie
  cookie_expiry: process.env.COOKIE_EXPIRY!!,

  //* email
  smtp_host: process.env.SMTP_HOST!!,
  smtp_service: process.env.SMTP_SERVICE!!,
  smtp_port: process.env.SMTP_PORT!!,
  smtp_user: process.env.SMTP_USER!!,
  smtp_pass: process.env.SMTP_PASS!!,
};
export default ENV_CONFIG;
