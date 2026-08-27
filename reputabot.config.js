/**
 * @type {import('reputabot').ReputaBotConfig}
 */
module.exports = {
  // Specify the branches to run checks on.
  // We will only run this on pull requests targeting 'main'.
  branches: ['main'],

  // Define the checks to be performed.
  checks: [
    {
      // ESLint check for code quality and style.
      name: 'ESLint',
      command: 'npm run lint',
      // This check is critical. If it fails, the pull request should be blocked.
      blocking: true,
    },
    {
      // TypeScript type-checking.
      name: 'TypeScript',
      command: 'npm run typecheck',
      // This is also a critical check to prevent type-related bugs.
      blocking: true,
    },
    {
      // Next.js build check. This will simulate the Vercel build process.
      // This is the most important check to prevent deployment failures.
      name: 'Next.js Build',
      command: 'npm run build',
      blocking: true,
      // Provide a clear message if the build fails.
      failureMessage: 'The Next.js build failed. This must be fixed before merging.',
    },
  ],

  // Optional: Add a comment to the pull request summarizing the results.
  comment: true,
};
