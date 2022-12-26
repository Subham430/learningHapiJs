const { store, all_products_details } = require('../controller/productController');
const validationError = require('../helper/validationError');
const { productStoreValidation } = require('../request/productValidation/productStoreValidation');

const router = [
    {
        method: 'GET',
        path: '/details',
        options: {
            auth: 'jwt',
            handler: all_products_details,
            description: "all products details api",
            notes: 'all products details api',
            tags: ['auth']
        }
    }, {
        method: 'POST',
        path: '/add',
        options: {
            auth: 'jwt',
            handler: store,
            description: "store product api",
            notes: 'store product api',
            tags: ['auth'],
            validate: {
                payload: productStoreValidation,
                failAction: validationError
            }
        }
    }, 
];

module.exports = router;