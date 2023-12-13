require('dotenv').config()

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3001,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
}