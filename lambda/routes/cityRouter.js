const express = require("express")
const router = express.Router()

const cityController = require("../controllers/cityController")
const cityValidator = require("../validators/cityValidator")

router.get("/", cityController.getAllCity)

router.post("/", cityValidator.validatePostRequest, cityController.createCity)

router.delete("/", cityValidator.validateDeleteRequest, cityController.deleteCity)

router.patch("/", cityValidator.validateUpdateRequest, cityController.updateCity)

module.exports = router