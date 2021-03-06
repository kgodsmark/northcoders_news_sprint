/* 
 * ESLint configuration for a basic Node project with Mocha and ES6
 */
 module.exports = {
    "extends": ["eslint:recommended"],
    "env": {
      "node": true,
      "mocha": true,
      "es6": true
    },
    "rules": {
      "space-before-blocks": "warn",
      "arrow-spacing": "warn",
      "keyword-spacing": "warn",
      "space-infix-ops": "warn",
      "space-in-parens": "warn",
      "spaced-comment": "warn",
      "semi": "warn",
      "no-multiple-empty-lines": ["error", {"max": 1}],
      "eol-last": "error",
      "handle-callback-err": "error",
      "camelcase": 0,
      "comma-spacing": "warn",
      "quotes": ["error", "single"],
      "no-console": 0
    }
  }

