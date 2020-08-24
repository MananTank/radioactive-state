export default {
	'env': {
		'browser': true,
		'es2020': true,
		'jest': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 11,
		'sourceType': 'module'
	},
	'plugins': [
		'react'
	],
	'rules': {
		'no-prototype-builtins' : 'off',
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		]
	}
}
