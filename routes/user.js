const { register } = require('../controller/userController');
const Joi = require('joi');

const router = [
    {
        method: 'POST',
        path: '/register',
        options: {
            auth: false,
            handler: register,
            description: "register  api",
            notes: 'register  api',
            tags: ['auth'],
            validate: {
                payload: Joi.object({
                    first_name: Joi.string()
                        .required()
                        .description('First name of user'),
                    last_name: Joi.string()
                        .required()
                        .description('Last name of user'),
                    email: Joi.string()
                        .required()
                        .description('email of user'),
                    password: Joi.string()
                        .required()
                        .description('password of user'),
                })
            }
        }
    }, 
];

module.exports = router;