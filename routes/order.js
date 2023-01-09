const { deletes, store, order_details } = require('../controller/oderController/index');
const validationError = require('../helper/validationError');
const { orderValidation } = require('../request/orderValidation');
const Joi = require('joi');

const router = [
    {
        method: 'GET',
        path: '/details/{order_id?}',
        options: {
            auth: 'jwt',
            handler: order_details,
            description: "all order details api",
            notes: 'all order details api',
            tags: ['api', 'order'],
            validate: {
                params: Joi.object({
                    order_id: Joi.number().min(1)
                }),
                failAction: validationError
            }
        }
    },{
        method: 'POST',
        path: '/add',
        options: {
            auth: 'jwt',
            handler: store,
            description: "store order api",
            notes: 'store order api',
            tags: ['api', 'order'],
            validate: {
                payload: orderValidation,
                failAction: validationError
            }
        }
    }, {
        method: 'DELETE',
        path: '/delete/{order_id}',
        options: {
            auth: 'jwt',
            handler: deletes,
            description: "delete order api",
            notes: 'delete order api',
            tags: ['api', 'order'],
            validate: {
                params: Joi.object({
                    order_id: Joi.number().min(1)
                }),
                failAction: validationError
            }
        }
    }, 
];

module.exports = router;