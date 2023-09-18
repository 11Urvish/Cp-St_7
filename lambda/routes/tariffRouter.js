const express = require("express")
const router = express.Router()

const tariffController = require("../controllers/tariffController")
const tariffValidator = require("../validators/tariffValidator")

router.get("/", tariffController.getAllTariff)

router.post("/", tariffValidator.validatePostRequest, tariffController.createTariff)

router.delete("/", tariffValidator.validateDeleteRequest, tariffController.deleteTariff)

router.patch("/", tariffValidator.validateUpdateRequest, tariffController.updateTariff)

module.exports = router