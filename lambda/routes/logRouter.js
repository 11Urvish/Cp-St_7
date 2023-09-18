const express = require("express")
const router = express.Router()

const logController = require("../controllers/logController")
const logValidator = require("../validators/logValidator")

router.get("/", logController.getAllLogs)

router.post("/", logValidator.validatePostRequest, logController.getLogsById)

module.exports = router