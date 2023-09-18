const express = require("express")
const router = express.Router()

const chargingStationController = require("../controllers/chargingStationController")
const chargingStationValidator = require("../validators/chargingStationValidator")


router.get("/", chargingStationController.getAllChargingStation)

router.post("/", chargingStationValidator.validatePostRequest, chargingStationController.createChargingStation)

router.delete("/", chargingStationValidator.validateDeleteRequest, chargingStationController.deleteChargingStation)

router.patch("/", chargingStationValidator.validateUpdateRequest, chargingStationController.updateChargingStation)

module.exports = router


