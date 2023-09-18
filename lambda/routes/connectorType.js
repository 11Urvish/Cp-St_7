const express = require("express")
const router = express.Router()

const connectorTypeController = require("../controllers/connectorTypeController")
const connectorTypeValidator = require("../validators/connectorTypeValidator")

router.get("/", connectorTypeController.getAllConnectorType)

router.post("/", connectorTypeValidator.validatePostRequest, connectorTypeController.createConnectorType)

router.delete("/", connectorTypeValidator.validateDeleteRequest, connectorTypeController.deleteConnectorType)

router.patch("/", connectorTypeValidator.validateUpdateRequest, connectorTypeController.updateConnectorType)

module.exports = router