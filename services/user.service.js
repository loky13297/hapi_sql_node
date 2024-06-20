const { loginToken } = require("../middleware/authentication");
const { textEncryption, compareEncryptedText } = require("../utils/textEncrypt");
const user = require("../model/user.model");
const { HTTP_CODE, CONSTANTS_TEXT } = require("../utils/constant")
const { Op } = require('sequelize');

const createUserService = async (req) => {
    try {
        const isUserExist = await user.findOne({
            where: {
                [Op.or]: [
                    { mobileNumber: req.payload.mobileNumber },
                    { email: req.payload.email }
                ]
            }
        })
        if (isUserExist) {
            return {
                error: true,
                status: HTTP_CODE.BAD_REQUEST,
                message: CONSTANTS_TEXT.USER_EXIST,
                data: {}
            }
        }
        if (req.payload.password === req.payload.confirmPassword) {
            req.payload.password = await textEncryption(req.payload.password)
            req.payload.confirmPassword = await textEncryption(req.payload.confirmPassword)

            await user.create(req.payload);

            return {
                error: false,
                status: HTTP_CODE.SUCCESS,
                message: CONSTANTS_TEXT.CREATE_USER,
                data: {}
            }
        } else {
            return {
                error: true,
                status: HTTP_CODE.BAD_REQUEST,
                message: "Password and confirm password does not match",
                data: {}
            }
        }
    } catch (err) {
        return {
            error: true,
            status: HTTP_CODE.BAD_REQUEST,
            message: CONSTANTS_TEXT.ERROR,
            data: err
        }
    }
}

const loginService = async (req) => {
    try {
        const userData = await user.findOne({
            where: {
                [Op.or]: [
                    { email: req.payload.email || "" },
                    { mobileNumber: req.payload.mobileNumber || "" }
                ]
            }
        })
        let isPassValid = await compareEncryptedText(req.payload.password, userData.dataValues.password)
        if (userData && isPassValid) {
            let obj = {}
            obj.name = userData.dataValues.firstName;
            obj.email = userData.dataValues.email;
            obj.mobileNumber = userData.dataValues.mobileNumber;
            obj.token = loginToken(userData.dataValues)
            return {
                error: false,
                status: HTTP_CODE.SUCCESS,
                message: CONSTANTS_TEXT.LOGIN_SUCCESS,
                data: obj
            }
        } else {
            return {
                error: true,
                status: HTTP_CODE.BAD_REQUEST,
                message: CONSTANTS_TEXT.INVALID_PASSWORD,
                data: {}
            }
        }
    } catch (err) {
        return {
            error: true,
            status: HTTP_CODE.BAD_REQUEST,
            message: CONSTANTS_TEXT.ERROR,
            data: {}
        }
    }
}

const getUserByIdService = async (req) => {
    try {
        let userData = await user.findOne({ where: { userId: req.params.id } })

        if (userData) {
            delete userData.dataValues.password;
            delete userData.dataValues.confirmPassword;
            delete userData.dataValues.isDelete;
            return {
                error: false,
                status: HTTP_CODE.SUCCESS,
                message: CONSTANTS_TEXT.SUCCESS,
                data: userData.dataValues
            }
        } else {
            return {
                error: true,
                status: HTTP_CODE.BAD_REQUEST,
                message: CONSTANTS_TEXT.USER_NOTFOUND,
                data: {}
            }
        }
    } catch (err) {
        return {
            error: true,
            status: HTTP_CODE.BAD_REQUEST,
            message: CONSTANTS_TEXT.ERROR,
            data: {}
        }
    }
}

const deleteUserByIdService = async (req) => {
    try {
        const userData = await user.findOne({ where: { userId: req.params.id } });
        if (userData) {
            await user.destroy({ where: { userId: req.params.id } })
            return {
                error: false,
                status: HTTP_CODE.SUCCESS,
                message: CONSTANTS_TEXT.SUCCESS,
                data: {}
            }
        } else {
            return {
                error: true,
                status: HTTP_CODE.BAD_REQUEST,
                message: CONSTANTS_TEXT.USER_NOTFOUND,
                data: {}
            }
        }
    } catch (err) {
        return {
            error: true,
            status: HTTP_CODE.BAD_REQUEST,
            message: CONSTANTS_TEXT.ERROR,
            data: {}
        }
    }
}

const updateUserByIdService = async (req) => {
    try {
        let userData = await user.findOne({ where: { userId: req.params.id } })

        if (userData) {
            await user.update({ ...req.payload }, { where: { userId: req.params.id } })
            return {
                error: false,
                status: HTTP_CODE.SUCCESS,
                message: "Updated",
                data: {}
            }
        } else {
            await user.create({ ...req.payload, userId: req.params.id })
            return {
                error: false,
                status: HTTP_CODE.SUCCESS,
                message: CONSTANTS_TEXT.CREATE_USER,
                data: {}
            }
        }
    } catch (err) {
        return {
            error: true,
            status: HTTP_CODE.BAD_REQUEST,
            message: CONSTANTS_TEXT.ERROR,
            data: err
        }
    }
}
module.exports = {
    createUserService,
    loginService,
    getUserByIdService,
    deleteUserByIdService,
    updateUserByIdService
}