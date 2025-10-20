const { Pool } = require ('pg');
require('dotenv').config()

module.exports = new Pool({
  connectionString: process.env.DATABASE_URL || 
    `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/grocery_inventory`,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});
