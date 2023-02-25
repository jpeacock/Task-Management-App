/* eslint-disable no-console */
const { ServiceBroker } = require("moleculer");
const express = require("express");

async function startItUp() {
  console.log(
    "***************************************************************************"
  );
  console.log(process.env);
  console.log(
    "***************************************************************************"
  );

  const broker = new ServiceBroker({
    nodeID: process.env.WEBSITE_INSTANCE_ID || "node1",
    transporter: "TCP",
    logger: true,
    logLevel: "info",
    requestTimeout: 5 * 1000,
    circuitBreaker: {
      enabled: true,
    },
    metrics: false,
  });

  broker.loadServices(`${__dirname}`, "**/*.service.js");

  const svc = broker.getLocalService("v1.api");

  const app = express();
  app.use("/", svc.express());

  app.use(
    express.json({
      type: [
        'application/json'
      ],
    })
  );
  
  app.listen(3001, (err) => {
    if (err) return console.error(err);
    console.log(`Listening on: 3001`);
  });

  broker.start();
  broker.repl();
}

startItUp();
