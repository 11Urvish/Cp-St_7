const express = require("express")
const router = express.Router()

const stateController = require("../controllers/stateController")
const stateValidator = require("../validators/stateValidator")

router.get("/", stateController.getAllState)

router.post("/", stateValidator.validatePostRequest, stateController.createState)

router.delete("/", stateValidator.validateDeleteRequest, stateController.deleteState)

router.patch("/", stateValidator.validateUpdateRequest, stateController.updateState)

module.exports = router