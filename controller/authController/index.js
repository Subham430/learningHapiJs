const {success, error} = require("../../response/macros.js");
const bcrypt = require('bcrypt');
const {getJwt} = require('../../config/authenticate');
const Jwt = require('@hapi/jwt');

//models
const { User } = require('../../models');

//login with email & password, returns user details and json web token
exports.jwt_login = async (request, h) => {
    try {
        const user = await User.findOne({
            where: {email: request.payload.email},
        });

        if (user === null) {
            return error({error: 'Wrong email'},"Invalid Email", 401)(h);
        }

        if (await bcrypt.compare(request.payload.password, user.password)) {
            delete user.dataValues.password;
            const token = getJwt(user);
            return success({token, user})(h);
        }
        return success({error: 'Wrong password'},"password did not match", 401)(h);
    } catch (err) {
        return error({error: err.message})(h);
    }
};

exports.jwt_logout = async (request, h) => {
    try {
        return success({logout: 'logout successfully'},"logout successfully", 200)(h);
    } catch (err) {
        return error({error: err.message})(h);
    }
};