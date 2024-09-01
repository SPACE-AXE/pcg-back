module.exports = {
  apps: [
    {
      name: 'pcg',
      script: './dist/main.js',
      watch: true,
      ignore_watch: [
        'ormlogs.log',
        '.git',
        'node_modules',
        'bun.lockb',
        'logs',
      ],
    },
  ],
};
