const { createUserService, loginService, getUserByIdService, deleteUserByIdService, updateUserByIdService } = require("../services/user.service")
const { successHandler, errorHandler } = require("../utils/responseHandler")

const createUser = async (req, res) => {
    const data = await createUserService(req)
    if (!data.error) {
        return successHandler(req, res, data.status, data.message, data.data)
    } else {
        return errorHandler(req, res, data.status, data.message, data.data)
    }
}

const userLogin = async (req, res) => {
    const data = await loginService(req)
    if (!data.error) {
        return successHandler(req, res, data.status, data.message, data.data)
    } else {
        return errorHandler(req, res, data.status, data.message, data.data)
    }
}

const getUserById = async (req, res) => {
    const data = await getUserByIdService(req)
    if (!data.error) {
        return successHandler(req, res, data.status, data.message, data.data)
    } else {
        return errorHandler(req, res, data.status, data.message, data.data)
    }
}

const deleteUserById = async (req, res) => {
    const data = await deleteUserByIdService(req)
    if (!data.error) {
        return successHandler(req, res, data.status, data.message, data.data)
    } else {
        return errorHandler(req, res, data.status, data.message, data.data)
    }
}

const updateUserById = async (req, res) => {
    const data = await updateUserByIdService(req)
    if (!data.error) {
        return successHandler(req, res, data.status, data.message, data.data)
    } else {
        return errorHandler(req, res, data.status, data.message, data.data)
    }
}

module.exports = { createUser, userLogin, getUserById, deleteUserById, updateUserById }