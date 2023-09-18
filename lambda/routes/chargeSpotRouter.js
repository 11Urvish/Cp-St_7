const express = require("express")
const router = express.Router()

const chargeSpotController = require("../controllers/chargeSpotController")
const chargeSpotValidator = require("../validators/chargeSpotValidator")

router.get("/", chargeSpotController.getAllChargeSpot)

router.post("/", chargeSpotValidator.validatePostRequest, chargeSpotController.createChargeSpot)

router.delete("/", chargeSpotValidator.validateDeleteRequest, chargeSpotController.deleteChargeSpot)

router.patch("/", chargeSpotValidator.validateUpdateRequest, chargeSpotController.updateChargeSpot)

module.exports = router