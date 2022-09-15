module.exports = {
   env: {
      browser: true,
      es2021: true,
      node: true
   },
   extends: [
      'airbnb-base',
      'airbnb-typescript/base',
      'plugin:prettier/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking'
   ],
   ignorePatterns: ['assets/','.eslintrc.*', 'vite.config.*', 'svelte.config.*'],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaVersion: 13,
      sourceType: 'module',
      tsconfigRootDir: __dirname,
      project: ['./tsconfig.json'],
      extraFileExtensions: ['.svelte']
   },
   plugins: ['svelte3', '@typescript-eslint'],
   rules: {
      'import/no-extraneous-dependencies': [
         'error',
         {
               devDependencies: true
         }
      ],
      'eqeqeq':'off', 
      'import/no-mutable-exports': 'off',
      'no-promise-executor-return': 'off',
      'no-lonely-if': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'import/prefer-default-export': 'off',
      'prettier/prettier': [
         'error', { 'endOfLine': 'auto' }
      ],
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
   },
   overrides: [
   {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
   }
   ],
   settings: {
      'svelte3/typescript': true
   }
}