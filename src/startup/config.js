const config = require("config");

module.exports = function() {
    const envConfig = config.get("ENV")

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key]
      })
}
