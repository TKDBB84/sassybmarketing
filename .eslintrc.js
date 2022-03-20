module.exports = {
	env: {
		es6: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'prettier',
	],
	parserOptions: {
		sourceType: 'module',
		"ecmaVersion": 2020,
	},
	plugins: ['eslint-plugin-jsdoc', 'eslint-plugin-prefer-arrow', 'eslint-plugin-react'],
	rules: {},
}
