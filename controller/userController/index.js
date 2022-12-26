const {success, error} = require("../../response/macros.js");
const bcrypt = require('bcrypt');
// const sequelize = require('sequelize');

//models
const { User, verification_code } = require('../../models');

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

        if (uniqueUser){
            return error({error:"email already exists"}, "Insert Unique Email", 422)(h)
        }

        const user = await User.create({
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

exports.all_users_details = async (request, h) => {
    // const t = await sequelize.transaction();
    try {
        const user_details = await User.findAll();
          
        return success({user: user_details}, "all users details fetched successfully", 200)(h);
    } catch (err) {
        // await t.rollback();
        return error({error: err.message})(h);
    }
};

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function deleteUniqueCode(userId) {
    await timeout(60000);
    await verification_code.destroy({
        where: {
            user_id: userId,
        }
      });
}

exports.forgot_password = async (request, h) => {
    // const t = await sequelize.transaction();
    try {
        const payload = request.payload;

        const findUser=await User.findOne({
            where: {
                email: payload.email,
            }
        });

        if (!findUser){
            return error({error:"email not found"}, "Insert an already registered Email", 422)(h)
        } else {
            const uniqueUserId=await verification_code.findOne({
                where: {
                    user_id: findUser.id,
                }
            });

            const uniqueCode = Math.floor((Math.random() * 9000) + 1000);
            if(!uniqueUserId) {
                await verification_code.create({
                    user_id: findUser.id,
                    code: uniqueCode
                })
            } else {
                await verification_code.update({
                    code: uniqueCode
                }, {
                    where: {
                        user_id: findUser.id,
                    }
                })
            }
            deleteUniqueCode(findUser.id)
            return success({UniqueCode: uniqueCode}, "Verification code successfully generated", 201)(h);
        }
    } catch (err) {
        // await t.rollback();
        return error({error: err.message})(h);
    }
};

exports.reset_password = async (request, h) => {
    // const t = await sequelize.transaction();
    try {
        const payload = request.payload;
        const salt = await bcrypt.genSalt(10);
        const HashedPassword = await bcrypt.hash(payload.password, salt);
        const findUser=await User.findOne({
            where: {
                email: payload.email,
            }
        });

        if (!findUser){
            return error({error:"email not found"}, "Insert an already registered Email", 422)(h)
        } else {
            const findCode=await verification_code.findOne({
                where: {
                    user_id: findUser.id,
                    code: payload.code,
                }
            });

            if (!findCode){
                return error({error:"code not found"}, "Insert a valid code", 422)(h)
            } else {
                await User.update({
                    password: HashedPassword,
                }, {
                    where: {
                        id: findUser.id,
                    }
                })
                return success("Password updated successfully", 201)(h);
            }
        }
    } catch (err) {
        // await t.rollback();
        return error({error: err.message})(h);
    }
};