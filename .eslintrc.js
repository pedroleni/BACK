module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended', 'standard', 'prettier'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		semi: true,
		singleQuote: true,
		tabWidth: 2,
		useTabs: false,
		trailingComma: 'all',
	},
};
