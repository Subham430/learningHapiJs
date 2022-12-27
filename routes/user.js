const { register, all_users_details, forgot_password, reset_password, update_profile } = require('../controller/userController');
const validationError = require('../helper/validationError');
const { registerValidation, forgotPasswordValidation, resetPasswordValidation } = require('../request/userValidation');

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
    }, {
        method: 'POST',
        path: '/forgotPassword',
        options: {
            auth: false,
            handler: forgot_password,
            description: "forgot password enter email",
            notes: 'forgot password enter email',
            tags: ['auth'],
            validate: {
                payload: forgotPasswordValidation,
                failAction: validationError
            }
        }
    },
    {
        method: 'POST',
        path: '/resetPassword',
        options: {
            auth: false,
            handler: reset_password,
            description: "reset password enter email and verification code",
            notes: 'reset password enter email and verification code',
            tags: ['auth'],
            validate: {
                payload: resetPasswordValidation,
                failAction: validationError
            }
        }
    },
    {
        method: 'PUT',
        path: '/updateProfile',
        options: {
            auth: 'jwt',
            handler: update_profile,
            description: "update user profile",
            notes: 'update user profile',
            tags: ['auth'],
        }
    },
];

module.exports = router;