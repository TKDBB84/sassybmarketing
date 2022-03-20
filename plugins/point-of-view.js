"use strict"
const fp = require("fastify-plugin")

module.exports = fp(async (fastify) => {
  fastify.register(require("point-of-view"), {
    engine: {
      ejs: require("handlebars"),
    },
  })
})
