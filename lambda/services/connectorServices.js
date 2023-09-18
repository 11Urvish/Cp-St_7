const chargerModel = require("../models/chargerModel");
const connectorModel = require("../models/connectorModel");
const { propogateError, validateSchema } = require("../utils/helper");
const { v4: uuidv4 } = require("uuid");

const { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand } = require("@aws-sdk/client-sqs");
const { DEST_QUEUE_URL } = require("../utils/constants");

// Instantiate an SQS client
const sqsClient = new SQSClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIA5NZ245NVKKBG4SXO",
    secretAccessKey: "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",
  },
});

const getAllConnectors = async (chargerId) => {
  try {
    const charger = await chargerModel.findById(chargerId).populate("connectors", { updatedAt: 0, createdAt: 0, __v: 0 });

    if (!charger) {
      return propogateError("Station does not exist!");
    }

    return { data: charger.connectors || [], message: "Connector Details!" };
  } catch (error) {
    return propogateError(error.message || "Error in finding Connectors!");
  }
};

const createConnector = async (connectorData) => {
  try {
    const connector = new connectorModel(connectorData);

    const charger = await chargerModel.findById(connectorData.chargerId);
    if (!charger) {
      throw new Error("Charger does not exist!");
    }

    const connectors = charger.connectors;
    connectors.push(connector._id);
    charger.connectors = connectors;

    await charger.save();

    connector.id = connectors.length;

    return { data: await connector.save(), message: "Connector created!" };
  } catch (error) {
    propogateError(error.message || "Error in creating new Connector!");
  }
};

const updateConnector = async (connectorData) => {
  try {
    const connector = await connectorModel.findById(connectorData.connectorId);

    if (!connector) {
      throw new Error("Connector does not exist!");
    }

    if (connectorData.chargerId) {
      if (connector.chargerId.toString() != connectorData.chargerId) {
        const oldCharger = await chargerModel.findById(connector.chargerId);
        const newCharger = await chargerModel.findById(connectorData.chargerId);

        if (!oldCharger || !newCharger) {
          propogateError("Charger does not exist");
        }

        oldCharger.connectors = oldCharger.connectors.filter((connectorId) => {
          return connectorId != connector._id.toString();
        });

        await oldCharger.save();

        let connectors = newCharger.connectors;
        connectors.push(connector._id);
        newCharger.connectors = connectors;

        await newCharger.save();
      }
    }

    connector.chargerId = connectorData.chargerId || connector.chargerId;
    connector.type = connectorData.type || connector.type;
    connector.tariff = connectorData.tariff || connector.tariff;
    connector.maxPower = connectorData.maxPower || connector.maxPower;
    connector.current = connectorData.current || connector.current;
    connector.phases = connectorData.phases || connector.phases;
    connector.status = connectorData.status || connector.status;

    return { data: await connector.save(), message: "Connector Updated" };
  } catch (error) {
    propogateError(error.message || "Error in updating Connector!");
  }
};

const deleteConnector = async ({ chargerId, connectorId }) => {
  try {
    if (!connectorId) {
      const chargers = await chargerModel.find();

      chargers.map(async (charger) => {
        charger.connectors = [];
        await charger.save();
      });

      return { data: await connectorModel.deleteMany({}), message: "All Connector Deleted!" };
    }

    const charger = await chargerModel.findById(chargerId);
    const connector = await connectorModel.findById(connectorId);

    if (!connector || !charger) {
      throw new Error((!charger ? "Charger " : "Connector ") + "does not exist!");
    }

    let connectors = charger.connectors;
    connectors = connectors.filter((id) => {
      return id != connector._id.toString();
    });
    charger.connectors = connectors;

    await charger.save();

    console.log(connectors);

    return { data: await connectorModel.deleteOne({ _id: connectorId }), message: "Connector deleted!" };
  } catch (error) {
    propogateError(error.message || "Error in deleting Connector!");
  }
};

const startTransaction = async ({ tenantId, chargerId, idTag, connectorId }) => {
  try {
    const client = tenantId + "_" + chargerId;

    const messageId = uuidv4();

    const reqParams = { idTag, connectorId };

    const isValid = validateSchema("RemoteStartTransaction", reqParams);
    if (!isValid) {
      throw new Error("Invalid Parameters");
    } else {
      const messageAttributes = {
        type: "2",
        token: messageId,
        action: "RemoteStartTransaction",
        params: JSON.stringify(reqParams),
        client: client,
      };

      const sendParams = {
        MessageBody: JSON.stringify(messageAttributes),
        QueueUrl: RECV_QUEUE_URL,
      };

      console.log(sendParams);

      try {
        const sendResult = await sqsClient.send(new SendMessageCommand(sendParams));
        console.log(`Message sent to the SQS queue: ${sendResult.MessageId}`);
      } catch (error) {
        console.error(`Error sending message to SQS queue: ${error.message}`);
      }

      return { data: null, message: "Transaction Started!" };
    }
  } catch (error) {
    propogateError(error.message || "Error in starting transaction!");
  }
};

const stopTransaction = async ({ tenantId, chargerId, transactionId }) => {
  try {
    const client = tenantId + "_" + chargerId;

    const messageId = uuidv4();

    const reqParams = { transactionId };

    const isValid = validateSchema("RemoteStopTransaction", reqParams);
    if (!isValid) {
      throw new Error("Invalid Parameters");
    } else {
      const messageAttributes = {
        type: "2",
        token: messageId,
        action: "RemoteStopTransaction",
        params: JSON.stringify(reqParams),
        client: client,
      };

      const sendParams = {
        MessageBody: JSON.stringify(messageAttributes),
        QueueUrl: DEST_QUEUE_URL,
      };

      console.log(sendParams);

      try {
        const sendResult = await sqsClient.send(new SendMessageCommand(sendParams));
        console.log(`Message sent to the SQS queue: ${sendResult.MessageId}`);
      } catch (error) {
        console.error(`Error sending message to SQS queue: ${error.message}`);
      }

      return { data: null, message: "Transaction Stopped!" };
    }
  } catch (error) {
    propogateError(error.message || "Error in stopping trabsaction!");
  }
};

module.exports.getAllConnectors = getAllConnectors;
module.exports.createConnector = createConnector;
module.exports.updateConnector = updateConnector;
module.exports.deleteConnector = deleteConnector;
module.exports.startTransaction = startTransaction;
module.exports.stopTransaction = stopTransaction;
