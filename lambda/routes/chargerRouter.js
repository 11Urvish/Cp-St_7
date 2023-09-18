const express = require("express")
const router = express.Router()

const chargerController = require("../controllers/chargerController")
const chargerValidator = require("../validators/chargerValidator")

router.get("/", chargerController.getAllChargers)

router.post("/", chargerValidator.validatePostRequest, chargerController.createCharger)

router.delete("/", chargerValidator.validateDeleteRequest, chargerController.deleteCharger)

router.patch("/", chargerValidator.validateUpdateRequest, chargerController.updateCharger)

module.exports = router