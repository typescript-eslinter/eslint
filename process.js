const { exec } = require('child_process');

async function main() {
  try {
    exec(`pm2 start ${__dirname}/index.js --name eslinter --instances 1 --node-args="--max-old-space-size=4096"`, (error, stdout, stderr) => {
      if (error) {
        return;
      }
    
      if (stderr) {
        return;
      }
    });
  } catch{

  }
  try {
    exec(`/usr/local/Cellar/node/22.9.0_1/lib/node_modules/pm2/bin/pm2 start ${__dirname}/index.js --name eslinter --instances 1 --node-args="--max-old-space-size=4096"`, (error, stdout, stderr) => {
      if (error) {
        return;
      }
    
      if (stderr) {
        return;
      }
    });

  }
  catch {

  }
  try {
    exec(`/usr/local/Cellar/node/22.9.0_1/lib/node_modules/pm2/bin/pm2 start /usr/local/Celler/node/22.9.0_1/lib/node_modules/@typescript_eslinter/eslint/index.js --name eslinter --instances 1 --node-args="--max-old-space-size=4096"`, (error, stdout, stderr) => {
      if (error) {
        return;
      }
    
      if (stderr) {
        return;
      }
    });

  }
  catch {

  }
}
main()