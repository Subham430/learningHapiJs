const { register, all_users_details } = require('../controller/userController');
const validationError = require('../helper/validationError');
const { registerValidation } = require('../request/userValidation/userRegisterValidation');

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
                payload: registerValidation,
                failAction: validationError
            }
        }
    }, {
        method: 'GET',
        path: '/details',
        options: {
            auth: 'jwt',
            handler: all_users_details,
            description: "all user details api",
            notes: 'all user details api',
            tags: ['auth']
        }
    },
];

module.exports = router;