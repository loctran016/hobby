// eslint.config.mjs
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  // This turns off all of Nuxt's built-in formatting/stylistic rules
  // so that Prettier has 100% control over code appearance.
  stylistic: false,

  // Your custom quality rules can still go here
  rules: {
    'no-console': 'warn'
  }
})
