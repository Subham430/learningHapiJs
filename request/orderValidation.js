const Joi = require('joi');
const { addressValidation } = require('./addressValidation')

const orderValidation = Joi.object({
    address: Joi.object({
        id: Joi.number()
        .required()
        .messages({
            "number.base": `"address_id" should be a type of 'number'`,
            "any.required": `"address_id" is a required field`
        }),
    }),
    address_new: addressValidation,
    products: Joi.array().items({
        id: Joi.number()
        .messages({
            "number.base": `"product_id" should be a type of 'number'`,
        }),
        quantity: Joi.number()
        .messages({
            "number.base": `"quantity" should be a type of 'number'`,
        }),
        item: Joi.string()
        .min(3)
        .max(100)
        .empty()
        .messages({
            "string.base": `"item" should be a type of 'text'`,
            "string.empty": `"item" cannot be an empty field`,
            "string.min": `"item" should have a minimum length of {#limit}`,
            "string.max": `"item" should have a maximum length of {#limit}`,
            "any.required": `"item" is a required field`
        }),
        description: Joi.string()
        .min(3)
        .max(100)
        .empty()
        .messages({
            "string.base": `"description" should be a type of 'text'`,
            "string.empty": `"description" cannot be an empty field`,
            "string.min": `"description" should have a minimum length of {#limit}`,
            "string.max": `"description" should have a maximum length of {#limit}`,
            "any.required": `"description" is a required field`
        }),
        
        amount: Joi.number()
        .messages({
            "number.base": `"amount" should be a type of 'number'`,
        }),  
    }).required()
    });

module.exports = {
    orderValidation
}