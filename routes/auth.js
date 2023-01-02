const { jwt_login, jwt_logout } = require('../controller/authController');
const Joi = require('joi');
const validationError = require('../helper/validationError');

const router = [
    {
        method: 'POST',
        path: '/login',
        options: {
            auth: false,
            handler: jwt_login,
            description: "login api",
            notes: 'login api',
            tags: ['api', 'auth'],
            validate: {
                payload: Joi.object({
                    email: Joi.string()
                        .required()
                        .email({ tlds: { allow: false } })
                        .description('valid email of user'),
                    password: Joi.string()
                        .required()
                        .min(8)
                        .max(20)
                        .description('password of user')
                }),
                failAction: validationError
            }
        }
    },
    {
        method: 'GET',
        path: '/logout',
        options: {
            auth: 'jwt',
            handler: jwt_logout,
            description: "logout api",
            notes: 'logout api',
            tags: ['api', 'auth']
        }
    },
];

module.exports = router;