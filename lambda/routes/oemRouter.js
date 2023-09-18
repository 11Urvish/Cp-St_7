const express = require("express")
const router = express.Router()

const oemController = require("../controllers/oemController")
const oemValidator = require("../validators/oemValidator")

router.get("/", oemController.getAllOem)

router.post("/", oemValidator.validatePostRequest, oemController.createOem)

router.delete("/", oemValidator.validateDeleteRequest, oemController.deleteOem)

router.patch("/", oemValidator.validateUpdateRequest, oemController.updateOem)

module.exports = router