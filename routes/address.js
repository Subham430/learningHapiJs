const { store, all_addresses, update_address, deletes } = require('../controller/userController/addressController');
const validationError = require('../helper/validationError');
const { addressValidation } = require('../request/addressValidation');
const Joi = require('joi');

const router = [
    {
        method: 'GET',
        path: '/details/{address_id?}',
        options: {
            auth: 'jwt',
            handler: all_addresses,
            description: "all address details api",
            notes: 'all address details api',
            tags: ['api', 'address']
        }
    }, {
        method: 'POST',
        path: '/add',
        options: {
            auth: 'jwt',
            handler: store,
            description: "store address api",
            notes: 'store address api',
            tags: ['api', 'address'],
            validate: {
                payload: addressValidation,
                failAction: validationError
            }
        }
    }, {
        method: 'PUT',
        path: '/edit/{address_id}',
        options: {
            auth: 'jwt',
            handler: update_address,
            description: "update address api",
            notes: 'update address api',
            tags: ['api', 'address'],
            validate: {
                params: Joi.object({
                    address_id: Joi.number().min(1)
                }),
                payload: addressValidation,
                failAction: validationError
            }
        }
    }, {
        method: 'DELETE',
        path: '/delete/{address_id}',
        options: {
            auth: 'jwt',
            handler: deletes,
            description: "delete address api",
            notes: 'delete address api',
            tags: ['api', 'address'],
            validate: {
                params: Joi.object({
                    address_id: Joi.number().min(1)
                }),
                failAction: validationError
            }
        }
    }, 
];

module.exports = router;