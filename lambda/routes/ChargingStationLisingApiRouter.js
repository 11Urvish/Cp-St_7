const express = require("express")
const router = express.Router()

const chargingStationLisingApiController = require("../controllers/chargingStationLisingApiController")
const chargingStationLisingAPIValidator = require("../validators/chargingStationLisingAPIValidator")

router.get("/", chargingStationLisingApiController.getAllChargingStationAccessType)

router.post("/", chargingStationLisingAPIValidator.validatePostRequest, chargingStationLisingApiController.createChargingStationAccessType)

router.delete("/", chargingStationLisingAPIValidator.validateDeleteRequest, chargingStationLisingApiController.deleteChargingStationAccessType)

router.put("/", chargingStationLisingAPIValidator.validateUpdateRequest, chargingStationLisingApiController.updateChargingStationAccessType)

module.exports = router