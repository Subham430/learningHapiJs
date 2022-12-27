const {success, error} = require("../../response/macros.js");
const bcrypt = require('bcrypt');
const { transport } = require('../../config/mail.js')
const randtoken = require('rand-token');

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

exports.update_profile = async (request, h) => {
    try {
        const payload = request.payload;
        const salt = await bcrypt.genSalt(10);
        const HashedPassword = await bcrypt.hash(payload.password, salt);

        const user = await User.update({
            firstName: payload.first_name,
            lastName: payload.last_name,
            password: HashedPassword,
        },
        {
            where: {
                id: request.auth.credentials.user.id,
            }
        }
        );
        // await t.commit();
        return success("User updated successfully", 201)(h);
    } catch (err) {
        // await t.rollback();
        return error({error: err.message})(h);
    }
}

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
    try {
        const payload = request.payload;

        const user=await User.findOne({
            where: {
                email: payload.email,
            }
        });

        if (!user){
            return error({error:"email not found"}, "Insert an already registered Email", 422)(h)
        } 

        const token = randtoken.generate(20);

        const verfyUserId = await verification_code.findOne({
            where: {
                user_id: user.id,
            }
        });
        if(!verfyUserId) {
            await verification_code.create({
                user_id: user.id,
                code: token
            })
        } else {
            await verification_code.update({
                code: token
            }, {
                where: {
                    user_id: user.id,
                }
            })
        }

        const mailOptions = {
            from: 'tutsmake@gmail.com',
            to: payload.email,
            subject: 'Reset Password Link - Tutsmake.com',
            html: '<p>You requested for reset password, kindly use this <a href="http://localhost:3000/codelogicx/user/resetPassword' + '">link</a> to reset your password. "'+ token +'" is your one time verification code</p>'
            };
        transport.sendMail(mailOptions);

        deleteUniqueCode(user.id)

        return success(mailOptions, "Reset Password Link", 200)(h);

    } catch (err) {
        return error({error: err.message})(h);
    }
};

exports.reset_password = async (request, h) => {
    try {
        const payload = request.payload;
        const salt = await bcrypt.genSalt(10);
        const HashedPassword = await bcrypt.hash(payload.password, salt);
        const user=await User.findOne({
            where: {
                email: payload.email,
            }
        });

        if (!user){
            return error({error:"email not found"}, "Insert an already registered Email", 422)(h)
        } 
        const findCode=await verification_code.findOne({
            where: {
                user_id: user.id,
                code: payload.code,
            }
        });
        if (!findCode){
            return error({error:"code not found"}, "Insert a valid code", 422)(h)
        } 
        await User.update({
            password: HashedPassword,
        }, {
            where: {
                id: user.id,
            }
        })
        return success("Password updated successfully", 201)(h);
    } catch (err) {
        return error({error: err.message})(h);
    }
};