module.exports = {
	env: {
		es6: true,
		node: true,
		"jest/globals": true,
	},
	extends: [
		"eslint:recommended",
		"plugin:jest/recommended",
		"plugin:jest/style",
		"plugin:jest/all",
		"prettier",
	],
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2020,
	},
	plugins: [
		"eslint-plugin-jsdoc",
		"eslint-plugin-prefer-arrow",
		"eslint-plugin-react",
		"eslint-plugin-jest",
	],
	rules: {
		"jest/no-hooks": "off",
		"jest/prefer-expect-assertions": "off",
	},
}
