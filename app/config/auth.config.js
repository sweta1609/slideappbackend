const config = require('./index')

module.exports = {
  secret: config.jwt.secret
}