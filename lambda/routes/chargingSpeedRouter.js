const express = require("express")
const router = express.Router()

const chargingSpeedController = require("../controllers/chargingSpeedController")
const chargingSpeedValidator = require("../validators/chargingSpeedValidator")

router.get("/", chargingSpeedController.getAllChargingSpeed)

router.post("/", chargingSpeedValidator.validatePostRequest, chargingSpeedController.createChargingSpeed)

router.delete("/", chargingSpeedValidator.validateDeleteRequest, chargingSpeedController.deleteChargingSpeed)

router.patch("/", chargingSpeedValidator.validateUpdateRequest, chargingSpeedController.updateChargingSpeed)

module.exports = router