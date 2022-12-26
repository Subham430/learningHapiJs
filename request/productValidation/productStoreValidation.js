const Joi = require('joi');

const productStoreValidation = Joi.object({
    product_name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.base": `"product_name" should be a type of 'text'`,
            "string.empty": `"product_name" cannot be an empty field`,
            "string.min": `"product_name" should have a minimum length of {#limit}`,
            "string.max": `"product_name" should have a maximum length of {#limit}`,
            "any.required": `"product_name" is a required field`
        }),
    description: Joi.string()
        .messages({
            "string.base": `"description" should be a type of 'text'`,
          }),
    price: Joi.number()
        .precision(2)
        .required()
        .messages({
            "string.base": `"price" should be a type of 'text'`,
            "any.required": `"price" is a required field`
        }),});

module.exports = {
    productStoreValidation
}