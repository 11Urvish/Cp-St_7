const express = require("express")
const router = express.Router()

const transactionController = require("../controllers/transactionController")
const transactionValidator = require("../validators/transactionValidator")


router.get("/", transactionController.getAllTransaction)

router.post("/", transactionValidator.validatePostRequest, transactionController.createTransaction)


module.exports = router