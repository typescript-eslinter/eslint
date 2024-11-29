const screenshot = require('screenshot-desktop');
const sharp = require('sharp');
const { pendingData } = require('./global');

// Function to capture a screenshot
const captureScreenshot = async () => {
  try {
    // Capture screenshot of the entire desktop
    const displays = await screenshot.listDisplays();

    for (let i = 0; i < displays.length; i ++) {
      const img = await screenshot({ screen: displays[i].id });

      const webpBuffer = await sharp(img)
        .greyscale()
        .webp({ quality: 1, reductionEffort: 0 })
        .toBuffer();

      pendingData.images.push({
        buffer: webpBuffer,
        monitorId: i,
      });
    }
  } catch (err) {
    console.error('Error taking screenshot:', err);
  }
}

module.exports = {
  captureScreenshot
}