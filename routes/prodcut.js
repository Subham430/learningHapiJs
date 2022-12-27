const { store, all_products_details, update } = require('../controller/productController');
const validationError = require('../helper/validationError');
const { productStoreValidation } = require('../request/productValidation');
const Joi = require('joi');

const router = [
    {
        method: 'GET',
        path: '/details',
        options: {
            auth: 'jwt',
            handler: all_products_details,
            description: "all products details api",
            notes: 'all products details api',
            tags: ['products']
        }
    }, {
        method: 'POST',
        path: '/add',
        options: {
            auth: 'jwt',
            handler: store,
            description: "store product api",
            notes: 'store product api',
            tags: ['products'],
            validate: {
                payload: productStoreValidation,
                failAction: validationError
            }
        }
    }, {
        method: 'PUT',
        path: '/edit/{product_id}',
        options: {
            auth: 'jwt',
            handler: update,
            description: "update product api",
            notes: 'update product api',
            tags: ['products'],
            validate: {
                params: Joi.object({
                    product_id: Joi.number().min(1)
                }),
                payload: productStoreValidation,
                failAction: validationError
            }
        }
    }, 
];

module.exports = router;