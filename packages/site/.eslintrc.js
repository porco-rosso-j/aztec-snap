module.exports = {
  extends: ['../../.eslintrc.js'],

  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      rules: {
        'jsdoc/require-jsdoc': 0,
      },
    },
  ],

  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },

  ignorePatterns: ['!.eslintrc.js', 'build/'],
};
