module.exports = {
  root: true,
  extends: './.eslintrc.yml',
  settings: {
    'svelte3/typescript': () => require('typescript'),
  },
}
