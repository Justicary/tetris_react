module.exports = {
    parserOptions: {
        ecmaFeatures: { jsx: true, },
        ecmaVersion: 6,
        sourceType: 'module',
    },
    "installedESLint": true,
    "extends": "airbnb",
    "plugins": [
        "react"
    ],
    "rules": {
        "react/jsx-filename-extension": [2, { extensions: ['.js','.jsx'] }],
        "func-names": [0],
        "new-cap": [2, { newIsCap: true ,capIsNew: true, capIsNewExceptions: ['List', 'Map']}],
        "linebreak-style": [0],
        "no-const-assign": "warn",
        "no-this-before-super": "warn",
        "no-restricted-globals": ["error", "event", "fdescribe"],
        "no-undef": "warn",
        "no-unreachable": "warn",
        "no-unused-vars": "warn",
        "constructor-super": "warn",
        "valid-typeof": "warn"
    },
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    }
};