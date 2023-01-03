const {success, error} = require("../../response/macros.js");
const { transport } = require('../../config/mail.js')
const { createInvoice } = require('../../config/invoice.js')

//models
const { order, order_product, address, Product } = require('../../models');

exports.order_details = async (request, h) => {
    try {
        if(request.params.order_id){
            const order_details = await order.findOne({            
                where: {id: request.params.order_id},
            });
            return success({order_details: order_details}, "order_details fetched successfully", 200)(h);
        }
        const orders = await order.findAll();
        return success({orders_list: orders}, "all order's list fetched successfully", 200)(h);
 
    } catch (err) {
        return error({error: err.message})(h);
    }
};

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
            if ( prod_length === 0){
                await order.update({ grand_total: grand_total },
                { where: {             
                    user_id: request.auth.credentials.user.id,
                    id : order_details.id
                } } );

                const invoice = {
                    shipping: {
                        name: request.auth.credentials.user.name,
                        address: '1234 Main Street',
                        city: 'San Francisco',
                        state: 'CA',
                        country: 'US',
                        postal_code: 94111,
                    },
                    items: request.payload.products,
                    subtotal: grand_total,
                    paid: 0,
                    invoice_nr: 1234,
                };
                createInvoice(invoice, 'invoice.pdf');

                const mailOptions = {
                    from: 'tutsmake@gmail.com',
                    to: request.auth.credentials.user.email,
                    subject: 'Order Placed - Tutsmake.com',
                    html: '<p>You order has been successfully placed. Product name "' + isProductExists.product_name + '" Quantity "' + product_details.quantity + '" Unit Price "' + isProductExists.price + '" total amount payable "' + grand_total+'" <a href="http://localhost:3000/invoice.pdf" </p>',
                    attachments: [
                    {   // file on disk as an attachment
                        filename: 'invoice.pdf',
                        path: './invoice.pdf' // stream this file
                    },
                    ]
                };
                transport.sendMail(mailOptions);
            }
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
        await order_product.destroy({where:{
            order_id: request.params.order_id,
            user_id: request.auth.credentials.user.id
        }, truncate: true});
        await delete_order.destroy();
        return success({delete_order: delete_order}, "order deleted successfully", 200)(h);
    } catch (err) {
        return error({error: err.message})(h);
    }
};