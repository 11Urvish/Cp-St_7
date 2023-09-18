const express = require("express")
const router = express.Router()

const chargeStationStatusController = require("../controllers/chargeStationStatusController")
const chargeStationStatusValidator = require("../validators/chargeStationStatusValidator")

router.get("/", chargeStationStatusController.getAllChargeStationStatus)

router.post("/", chargeStationStatusValidator.validatePostRequest, chargeStationStatusController.createChargeStationStatus)

router.delete("/", chargeStationStatusValidator.validateDeleteRequest, chargeStationStatusController.deleteChargeStationStatus)

router.patch("/", chargeStationStatusValidator.validateUpdateRequest, chargeStationStatusController.updateChargeStationStatus)

module.exports = router