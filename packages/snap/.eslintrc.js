module.exports = {
  //rules: {
  //   'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  // },
  // ignorePatterns: ['!.eslintrc.js', 'dist/'],
  //  };
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {},
};
