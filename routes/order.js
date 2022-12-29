const { deletes, store } = require('../controller/oderController/index');
const validationError = require('../helper/validationError');
// const {  } = require('../request/');
const Joi = require('joi');

const router = [
    {
        method: 'POST',
        path: '/add',
        options: {
            auth: 'jwt',
            handler: store,
            description: "store order api",
            notes: 'store order api',
            tags: ['order'],
            // validate: {
            //     payload: ,
            //     failAction: validationError
            // }
        }
    }, {
        method: 'DELETE',
        path: '/delete/{order_id}',
        options: {
            auth: 'jwt',
            handler: deletes,
            description: "delete order api",
            notes: 'delete order api',
            tags: ['order'],
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