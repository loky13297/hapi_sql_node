const { createUser, userLogin, getUserById, deleteUserById, updateUserById } = require("../controller/user.controller");

const routes = [
    {
        method: "POST",
        path: "/v1/user/createUser",
        handler: createUser,
    },
    {
        method: "POST",
        path: "/v1/user/login",
        handler: userLogin,
    },
    {
        method: "GET",
        path: "/v1/user/getUser/{id}",
        handler: getUserById,
    },
    {
        method: "DELETE",
        path: "/v1/user/deleteUser/{id}",
        handler: deleteUserById,
    },
    {
        method: "PUT",
        path: "/v1/user/updateUser/{id}",
        handler: updateUserById,
    },
];


module.exports = routes