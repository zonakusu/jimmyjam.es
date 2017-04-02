module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-mixins': true,
    'postcss-cssnext': {
      browsers: ['last 2 versions', '> 5%'],
    },
  },
};
