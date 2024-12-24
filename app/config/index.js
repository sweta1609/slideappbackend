const validateConfig = require('./validations')

const config = {
  dev: process.env.DEV_ENV,
  mongo: {
    username: process.env.MONGO_USERNAME || null,
    password: process.env.MONGO_PASSWORD || null,
    host: process.env.MONGO_HOST || null,
    db: process.env.MONGO_DB || null,
  },
  jwt: {
    secret: process.env.JWT_SECRET || null,
  },

}

validateConfig(config)

module.exports = config
