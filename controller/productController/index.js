const {success, error} = require("../../response/macros.js");
const bcrypt = require('bcrypt');
// const sequelize = require('sequelize');

//models
const { Product } = require('../../models');

exports.store = async (request, h) => {
    // const t = await sequelize.transaction();
    try {
        let product = await Product.create({
            product_name: request.payload.product_name,
            description: request.payload.description,
            price: request.payload.price,
        },
            // {transaction:t}
        );
        // await t.commit();
        return success({product: product}, "Product created successfully", 201)(h);
    } catch (err) {
        // await t.rollback();
        return error({error: err.message})(h);
    }
};

exports.all_products_details = async (request, h) => {
    // const t = await sequelize.transaction();
    try {
        const product_details = await Product.findAll();
          
        return success({products: product_details}, "all product details fetched successfully", 200)(h);
    } catch (err) {
        // await t.rollback();
        return error({error: err.message})(h);
    }
};