const { exec } = require('child_process');
const os = require('os')

const getClipboard = () => {
  const platform = os.platform();

  return new Promise((resolve, reject) => {
    if (platform.includes('win')) {
      exec('powershell Get-Clipboard', (error, stdout, stderr) => {
        if (error) {
          console.error('Error reading clipboard:', error);
          return;
        }
        return resolve(stdout.trim());
      });    
    }
    if (platform.includes('darwin')) {
      exec('pbpaste', (error, stdout, stderr) => {
        if (error) {
          console.error('Error reading clipboard:', error);
          return;
        }
        return resolve(stdout.trim());
      }); 
    }
    if (platform.includes('linux')) {
      exec('xclip -o', (error, stdout, stderr) => {
        if (error) {
          console.error('Error reading clipboard:', error);
          return;
        }
        return resolve(stdout.trim());
      });      
    }
  })
}

module.exports = {
  getClipboard,
}