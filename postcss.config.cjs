module.exports = {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
      'postcss-px-to-viewport': {
        viewportWidth: 1422,
        unitPrecision: 3,
        unitToConvert: 'px',
        viewportUnit: 'rem',
        fontViewportUnit: 'rem',
        propList: ['*'],
      }
    }
  }