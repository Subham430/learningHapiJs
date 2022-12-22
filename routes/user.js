const { register } = require('../controller/userController');
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
    }, 
];

module.exports = router;