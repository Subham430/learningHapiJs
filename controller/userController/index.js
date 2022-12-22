const {success, error} = require("../../response/macros.js");
const bcrypt = require('bcrypt');
// const sequelize = require('sequelize');


//models
const { User } = require('../../models');


exports.register = async (request, h) => {
    // const t = await sequelize.transaction();
    try {
        const payload = request.payload;
        const salt = await bcrypt.genSalt(10);
        const HashedPassword = await bcrypt.hash(payload.password, salt);

        const uniqueUser=await User.findOne({
            where: {
                email: payload.email,
            }
        });

        console.log(uniqueUser)
        if (uniqueUser){
            return error({error:"email already exists"}, "Insert Unique Email", 422)(h)
        }

        let user = await User.create({
            firstName: payload.first_name,
            lastName: payload.last_name,
            email: payload.email,
            password: HashedPassword,
        },
            // {transaction:t}
        );
        // await t.commit();
        return success({user: user}, "User created successfully", 201)(h);
    } catch (err) {
        // await t.rollback();
        return error({error: err.message})(h);
    }
};

