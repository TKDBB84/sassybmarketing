"use strict"

const Fastify = require("fastify")
const Support = require("../../plugins/support")

describe("fastify support", () => {
  it("support works standalone", async () => {
    expect.assertions(1)
    const fastify = Fastify()
    fastify.register(Support)

    await fastify.ready()
    expect(fastify.someSupport()).toBe("hugs")
  })
})
