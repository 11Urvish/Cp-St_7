const express = require("express")
const router = express.Router()

const areaController = require("../controllers/areaController")
const areaValidator = require("../validators/areaValidator")

router.get("/", areaController.getAllArea)

router.post("/", areaValidator.validatePostRequest, areaController.createArea)

router.delete("/", areaValidator.validateDeleteRequest, areaController.deleteArea)

router.patch("/", areaValidator.validateUpdateRequest, areaController.updateArea)

module.exports = router