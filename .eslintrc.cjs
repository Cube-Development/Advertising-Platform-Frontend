module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      // AI chat action panels. These render inside an <adras-action> popover
      // that is shown over whatever page the user is currently on, so they must
      // not carry page-level behaviour with them.
      files: ['src/app/chat-actions/**/*.{ts,tsx}'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['@pages/*', '**/pages/*'],
                message:
                  'Chat actions must not mount route pages. Page shells call useClearCookiesOnPage() during render, redirect from mount effects, and reload the whole app when their lazy chunk fails. Compose widgets/features instead.',
              },
            ],
            paths: [
              {
                name: 'react-router-dom',
                importNames: ['useNavigate', 'Navigate'],
                message:
                  'Use useChatActionNav().go() instead — a panel may only change the route on a user gesture, and it must close itself first. `Link` is fine.',
              },
            ],
          },
        ],
      },
    },
    {
      // The nav hook is the one place allowed to call useNavigate.
      files: ['src/app/chat-actions/ui/use-chat-action-nav.ts'],
      rules: { 'no-restricted-imports': 'off' },
    },
  ],
}
