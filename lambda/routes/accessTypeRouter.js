const express = require("express")
const router = express.Router()

const accessTypeController = require("../controllers/accessTypeController")
const accessTypeValidator = require("../validators/accessTypeValidator")

router.get("/", accessTypeController.getAllAccessType)

router.post("/", accessTypeValidator.validatePostRequest, accessTypeController.createAccessType)

router.delete("/", accessTypeValidator.validateDeleteRequest, accessTypeController.deleteAccessType)

router.patch("/", accessTypeValidator.validateUpdateRequest, accessTypeController.updateAccessType)

module.exports = router