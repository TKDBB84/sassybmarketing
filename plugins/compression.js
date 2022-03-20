"use strict"

const fp = require("fastify-plugin")

module.exports = fp(async (fastify) => {
	fastify.register(require("fastify-compress"), {
		global: true,
	})
})
