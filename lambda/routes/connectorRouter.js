const express = require("express")
const router = express.Router()

const connectorController = require("../controllers/connectorController")
const connectorValidator = require("../validators/connectorValidator")

router.get("/", connectorController.getAllConnectors)

router.post("/", connectorValidator.validatePostRequest, connectorController.createConnector)

router.delete("/", connectorValidator.validateDeleteRequest, connectorController.deleteConnector)

router.patch("/", connectorValidator.validateUpdateRequest, connectorController.updateConnector)

router.post("/start", connectorValidator.validateStartTransactionRequest, connectorController.startTransaction)

router.post("/stop", connectorValidator.validateStopTransactionRequest, connectorController.stopTransaction)

module.exports = router