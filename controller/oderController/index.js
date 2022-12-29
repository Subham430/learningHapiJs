const {success, error} = require("../../response/macros.js");

//models
const { order, order_product, address, Product } = require('../../models');

exports.store = async (request, h) => {
    try {
        let new_address, grand_total=0, prod_length = request.payload.products.length;
        if(request.payload.address)
        {
            const isAddressExists = await address.findOne({ where:{
                id: request.payload.address.id
            }});
            if(!isAddressExists)
                return error({error: "address doest not exists"}, "address doest not exists", 422 )(h);
        }
    
        if(request.payload.address_new){
            new_address = await address.create({
                user_id: request.auth.credentials.user.id,
                address_1: request.payload.address_new.address_1,
                address_2: request.payload.address_new.address_2,
                city: request.payload.address_new.city,
                state: request.payload.address_new.state,
                country: request.payload.address_new.country,
                postal_code: request.payload.address_new.postal_code,
            });
        }

        const order_details = await order.create({
            user_id: request.auth.credentials.user.id,
            address_id: request.payload.address_new ? new_address.id : request.payload.address.id
        });

        request.payload.products.forEach(async product_details => {
            const isProductExists = await Product.findOne({ where:{
                id: product_details.id
            }})
            if(!isProductExists)
                return error({error: "product doest not exists"}, "product doest not exists", 422 )(h);

            await order_product.create({
                user_id: request.auth.credentials.user.id,
                order_id: order_details.id,
                product_id: product_details.id,
                price: isProductExists.price * product_details.quantity,
                quantity: product_details.quantity
            });
            grand_total = grand_total + isProductExists.price * product_details.quantity

            prod_length -= 1;
            if ( prod_length === 0)
                await order.update({ grand_total: grand_total },
                    { where: {             
                        user_id: request.auth.credentials.user.id,
                        id : order_details.id
                    } } );
        }
        );

        return success({order: order_details}, "order created successfully ", 201)(h);
    } catch (err) {
        return error({error: err.message})(h);
    }
};

exports.deletes = async (request, h) => {
    try {
        const delete_order = await order.findOne({ where: { id: request.params.order_id } });
        if(!delete_order)
            return error({error: "order doest not exists"})(h);
        const order_products = order_product.findAll({ 
            where: { 
                order_id: request.params.order_id,
                user_id: request.auth.credentials.user.id
        }});

        order_products.destroy({where:{}});
        delete_order.destroy();

        return success({address_deleted: address_deleted}, "order deleted successfully", 200)(h);
    } catch (err) {
        return error({error: err.message})(h);
    }
};