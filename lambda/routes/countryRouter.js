const express = require("express")
const router = express.Router()

const countryController = require("../controllers/countryController")
const countryValidator = require("../validators/countryValidator")

router.get("/", countryController.getAllCountry)

router.post("/", countryValidator.validatePostRequest, countryController.createCountry)

router.delete("/", countryValidator.validateDeleteRequest, countryController.deleteCountry)

router.patch("/", countryValidator.validateUpdateRequest, countryController.updateCountry)

module.exports = router