const Joi = require('joi');

const addressValidation = Joi.object({
    user_id: Joi.number()
        .messages({
            "number.base": `"user_id" should be a type of 'number'`,
        }),
    address_1: Joi.string()
        .min(3)
        .max(100)
        .empty()
        .required()
        .messages({
            "string.base": `"address_1" should be a type of 'text'`,
            "string.empty": `"address_1" cannot be an empty field`,
            "string.min": `"address_1" should have a minimum length of {#limit}`,
            "string.max": `"address_1" should have a maximum length of {#limit}`,
            "any.required": `"address_1" is a required field`
        }),
    address_2: Joi.string()
        .min(3)
        .max(100)
        .empty()
        .messages({
            "string.base": `"address_2" should be a type of 'text'`,
            "string.empty": `"address_2" cannot be an empty field`,
            "string.min": `"address_2" should have a minimum length of {#limit}`,
            "string.max": `"address_2" should have a maximum length of {#limit}`,
            "any.required": `"address_2" is a required field`
        }),
    city: Joi.string()
        .messages({
            "string.base": `"city" should be a type of 'string'`,
            "string.empty": `"city" cannot be an empty field`,
            "string.min": `"city" should have a minimum length of {#limit}`,
            "string.max": `"city" should have a maximum length of {#limit}`,
            "any.required": `"city" is a required field`
        }),
    state: Joi.string()
        .messages({
            "string.base": `"state" should be a type of 'string'`,
            "string.empty": `"state" cannot be an empty field`,
            "string.min": `"state" should have a minimum length of {#limit}`,
            "string.max": `"state" should have a maximum length of {#limit}`,
            "any.required": `"state" is a required field`
        }),
    country: Joi.string()
        .messages({
            "string.base": `"country" should be a type of 'string'`,
            "string.empty": `"country" cannot be an empty field`,
            "string.min": `"country" should have a minimum length of {#limit}`,
            "string.max": `"country" should have a maximum length of {#limit}`,
            "any.required": `"country" is a required field`
        }),
    postal_code: Joi.number()
        .messages({
            "number.base": `"postal_code" should be a type of 'number'`,
        }),
    });

module.exports = {
    addressValidation
}