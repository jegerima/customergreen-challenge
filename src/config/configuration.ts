export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    user: process.env.DB_USER,
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    pass: process.env.DB_PASS,
  },
  jwtSecret: process.env.JWT_SECRET,
});
