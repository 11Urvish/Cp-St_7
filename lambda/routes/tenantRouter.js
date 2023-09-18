const express = require("express")
const router = express.Router()

const tenantController = require("../controllers/tenantController")

const tenantValidator = require("../validators/tenantValidator")


router.get("/", tenantController.getAllTenant)

router.post("/", tenantValidator.validatePostRequest, tenantController.createTenant)

router.delete("/", tenantValidator.validateDeleteRequest, tenantController.deleteTenant)

router.patch("/", tenantValidator.validateUpdateRequest, tenantController.updateTenant)

module.exports = router