const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController")
const userValidator = require("../validators/userValidator")

router.get("/", userController.getAllUsers)

router.post("/", userValidator.validatePostRequest, userController.createUser)

router.delete("/", userValidator.validateDeleteRequest, userController.deleteUser)

router.patch("/", userValidator.validateUpdateRequest, userController.updateUser)

router.post("/login", userValidator.validateLoginRequest, userController.loginUser)

module.exports = router