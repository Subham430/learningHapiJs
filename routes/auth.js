const { jwt_login } = require('../controller/authController');
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
            tags: ['auth'],
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
];

module.exports = router;