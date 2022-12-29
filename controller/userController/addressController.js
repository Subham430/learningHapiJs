const {success, error} = require("../../response/macros.js");

//models
const { address, User } = require('../../models');

exports.store = async (request, h) => {
    try {
        const user = await User.findOne({
            where: {
                id: request.payload.user_id            }
        });

        if(!user)
            return error({error: "user not found"}, "user not found", 404)(h);

        const user_address = await address.create({
            user_id: request.payload.user_id,
            address_1: request.payload.address_1,
            address_2: request.payload.address_2,
            city: request.payload.city,
            state: request.payload.state,
            country: request.payload.country,
            postal_code: request.payload.postal_code,
        });
        return success({address: user_address}, "User's address created successfully", 201)(h);
    } catch (err) {
        return error({error: err.message})(h);
    }
};

exports.all_addresses = async (request, h) => {
    // const t = await sequelize.transaction();
    try {
        if(request.params.address_id){
            const user_address = await address.findOne({            
                where: {id: request.params.address_id},
            });
            return success({all_address: user_address}, "address fetched successfully", 200)(h);
        }
        const addresses = await address.findAll();
        return success({address: addresses}, "all user's address fetched successfully", 200)(h);
 
    } catch (err) {
        // await t.rollback();
        return error({error: err.message})(h);
    }
};

exports.update_address = async (request, h) => {
    try {
        const updated_address = await address.update({
            user_id: request.auth.credentials.user.id,
            address_1: request.payload.address_1,
            address_2: request.payload.address_2,
            city: request.payload.city,
            state: request.payload.state,
            country: request.payload.country,
            postal_code: request.payload.postal_code,
        },
        {
            where: {
                id: request.params.address_id,
            }
        }
        );
        return success({address: updated_address},"User address updated successfully", 201)(h);
    } catch (err) {
        return error({error: err.message})(h);
    }
}

exports.deletes = async (request, h) => {
    try {
        const address_deleted = await address.findOne({ where: { id: request.params.address_id } });
        if(!address_deleted)
            return error({error: "product doest not exists"})(h);
        address_deleted.destroy();

        return success({address_deleted: address_deleted}, "address deleted successfully", 200)(h);
    } catch (err) {
        return error({error: err.message})(h);
    }
};