const express = require("express")
const router = express.Router()

const stationController = require("../controllers/stationController")
const stationValidator = require("../validators/stationValidator")


router.get("/", stationController.getAllStations)

router.post("/", stationValidator.validatePostRequest, stationController.createStation)

router.delete("/", stationValidator.validateDeleteRequest, stationController.deleteStation)

router.patch("/", stationValidator.validateUpdateRequest, stationController.updateStation)

module.exports = router