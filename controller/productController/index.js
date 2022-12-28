const {success, error} = require("../../response/macros.js");

//models
const { Product } = require('../../models');

exports.store = async (request, h) => {
    try {
        let product = await Product.create({
            product_name: request.payload.product_name,
            description: request.payload.description,
            price: request.payload.price,
        },);
        return success({product: product}, "Product created successfully", 201)(h);
    } catch (err) {
        return error({error: err.message})(h);
    }
};

exports.all_products_details = async (request, h) => {
    try {
        const product_details = await Product.findAll();
          
        return success({products: product_details}, "all product details fetched successfully", 200)(h);
    } catch (err) {
        return error({error: err.message})(h);
    }
};

exports.update = async (request, h) => {
    try {
        const product_details = await Product.findOne({ where: { id: request.params.product_id } });
        if(!product_details)
            return error({error: "product doest not exists"})(h);
        product_details.update({ 
            product_name: request.payload.product_name,
            description: request.payload.description,
            price: request.payload.price
         });

        return success({products: product_details}, "product updated successfully", 200)(h);
    } catch (err) {
        return error({error: err.message})(h);
    }
};

exports.deletes = async (request, h) => {
    try {
        const product_details = await Product.findOne({ where: { id: request.params.product_id } });
        if(!product_details)
            return error({error: "product doest not exists"})(h);
        product_details.destroy();

        return success({products: product_details}, "product deleted successfully", 200)(h);
    } catch (err) {
        return error({error: err.message})(h);
    }
};