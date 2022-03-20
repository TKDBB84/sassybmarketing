"use strict"

const mockSendMail = jest.fn().mockResolvedValue({})
jest.mock("nodemailer", () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  }),
}))

const Fastify = require("fastify")
const fp = require("fastify-plugin")
const App = require("../../app")
const app = Fastify()

describe("fastify root routes", () => {
  beforeAll(async () => {
    void app.register(fp(App))
    await app.ready()
  })

  afterAll(() => app.close())

  it("default root route", async () => {
    expect.assertions(1)
    const res = await app.inject({
      url: "/",
    })
    expect(res.statusCode).toBe(200)
  })

  describe("send email", () => {
    it("short form", async () => {
      expect.assertions(2)
      const res = await app.inject({
        path: "/contact",
        method: "POST",
        payload: {
          name: "Bob Smith",
          email: "bob@smith.com",
        },
      })
      expect(mockSendMail).toHaveBeenCalledWith({
        from: "bob@smith.com",
        to: "hello@savvybmarketing.com",
        subject: `New Contact From: Bob Smith`,
        text: `No Message Provided by Bob Smith (bob@smith.com)`,
      })
      expect(res.statusCode).toBe(200)
    })
    it("long form", async () => {
      const res = await app.inject({
        path: "/contact",
        method: "POST",
        payload: {
          name: "Bob Smith",
          email: "bob@smith.com",
          message: "hello i am bob",
        },
      })

      expect(mockSendMail).toHaveBeenCalledWith({
        from: "bob@smith.com",
        to: "hello@savvybmarketing.com",
        subject: `New Contact From: Bob Smith`,
        text: `Message From: Bob Smith (bob@smith.com)\n\nhello i am bob`,
      })
      expect(res.statusCode).toBe(200)
    })
  })
})
