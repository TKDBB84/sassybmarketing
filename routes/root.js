'use strict'
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
	sendmail: true,
	newline: 'unix',
	path: '/usr/sbin/sendmail',
})

module.exports = async function (fastify, opts) {
	fastify.get('/', async function (request, reply) {
		return reply.sendFile('index.html') // serving path.join(__dirname, 'public', 'myHtml.html') directly
	})
	fastify.post('/contact', async (request, reply) => {
		const {
			body: {
				name,
				email,
				message = '',
			},
		} = request


		try {
			// await transporter.sendMail({
			// 	from: email,
			// 	to: 'hello@savvybmarketing.com',
			// 	subject: `New Contact From: ${name}`,
			// 	text: message === '' ? `No Message Provided by ${name} (${email})` : `Message From: ${name} (${email})\n\n${message}`
			// });
			reply.send({ success: true })
		} catch (e) {
			console.error('error sending email')
			console.error(e)
			reply.send({ success: false })
		}
	})
}
