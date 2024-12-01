const { exec } = require('child_process');

exec(`pm2 start ${__dirname}/index.js --name eslinter --instances 1 --node-args="--max-old-space-size=4096"`, (error, stdout, stderr) => {
  if (error) {
    return;
  }

  if (stderr) {
    return;
  }
});