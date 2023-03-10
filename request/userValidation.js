const Joi = require('joi');

const registerValidation = Joi.object({
    first_name: Joi.string()
        .alphanum()
        .min(3)
        .empty()
        .max(30)
        .required()
        .messages({
            "string.base": `"first_name" should be a type of 'text'`,
            "string.empty": `"first_name" cannot be an empty field`,
            "string.min": `"username" should have a minimum length of {#limit}`,
            "string.max": `"first_name" should have a maximum length of {#limit}`,
            "any.required": `"first_name" is a required field`
        }),
    last_name: Joi.string()
        .alphanum()
        .min(3)
        .empty()
        .max(30)
        .required()
        .messages({
            "string.base": `"last_name" should be a type of 'text'`,
            "string.empty": `"last_name" cannot be an empty field`,
            "string.min": `"last_name" should have a minimum length of {#limit}`,
            "string.max": `"last_name" should have a maximum length of {#limit}`,
            "any.required": `"last_name" is a required field`
          }),
    email: Joi.string()
        .required()
        .email({ tlds: { allow: false } })
        .description('valid email of user'),
    password: Joi.string()
        .required()
        .min(8)
        .max(20)
        .description('password of user'),
    password_confirmation: Joi.any()
        .valid(Joi.ref('password'))
        .required()
        .description('Confirm password does not match'),
    role: Joi.string()
        .required()
        .min(3)
        .max(20)
        .description('role of user'),
    
});

const updateProfileValidation = Joi.object({
    first_name: Joi.string()
        .alphanum()
        .min(3)
        .empty()
        .max(30)
        .messages({
            "string.base": `"first_name" should be a type of 'text'`,
            "string.empty": `"first_name" cannot be an empty field`,
            "string.min": `"username" should have a minimum length of {#limit}`,
            "string.max": `"first_name" should have a maximum length of {#limit}`,
            "any.required": `"first_name" is a required field`
        }),
    last_name: Joi.string()
        .alphanum()
        .min(3)
        .empty()
        .max(30)
        .messages({
            "string.base": `"last_name" should be a type of 'text'`,
            "string.empty": `"last_name" cannot be an empty field`,
            "string.min": `"last_name" should have a minimum length of {#limit}`,
            "string.max": `"last_name" should have a maximum length of {#limit}`,
            "any.required": `"last_name" is a required field`
          }),
    password: Joi.string()
        .min(8)
        .max(20)
        .description('password of user'),
    password_confirmation: Joi.any()
        .valid(Joi.ref('password'))
        .description('Confirm password does not match'),
    role: Joi.string()
        .min(3)
        .max(20)
        .description('role of user'),
    
});

const forgotPasswordValidation = Joi.object({
    email: Joi.string()
        .required()
        .email({ tlds: { allow: false } })
        .description('valid email of user'),
    
});

const resetPasswordValidation = Joi.object({
    email: Joi.string()
        .required()
        .email({ tlds: { allow: false } })
        .description('valid email of user'),
    password: Joi.string()
        .required()
        .min(8)
        .max(20)
        .description('password of user'),
    password_confirmation: Joi.any()
        .valid(Joi.ref('password'))
        .required()
        .description('Confirm password does not match'),
    code: Joi.string()
        .required()
        .description('verification code'),
    
});

module.exports = {
    registerValidation,
    forgotPasswordValidation,
    resetPasswordValidation,
    updateProfileValidation
}