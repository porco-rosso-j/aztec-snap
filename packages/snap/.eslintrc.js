module.exports = {
  extends: ['../../.eslintrc.js'],
  // "import/no-extraneous-dependencies": ["error", {projectDependencies: false}],
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
  ignorePatterns: ['!.eslintrc.js', 'dist/'],
};
