'use strict'
const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  fastify.register(require('point-of-view'), {
    engine: {
      ejs: require("handlebars"),
    },
  })
})
