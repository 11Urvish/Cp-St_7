const express = require("express")
const oemVendorController = require("../controllers/oemVendorController")
const oemVendorValidator = require("../validators/oemVendorValidator")
const router = express.Router()

router.get('/', oemVendorController.getAllOemVendors)

router.post('/', oemVendorValidator.validatePostRequest, oemVendorController.createOemVendor)

router.patch('/', oemVendorValidator.validatePatchRequest, oemVendorController.updateOemVendor)

router.delete('/', oemVendorValidator.validateDeleteRequest, oemVendorController.deleteOemVendor)

module.exports = router