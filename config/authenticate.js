const Jwt = require('@hapi/jwt');

//generate token
exports.getJwt = function (user) {
    return Jwt.token.generate(
        {
            expiresIn: 36000,
            aud: 'urn:audience:test',
            iss: 'urn:issuer:test',
            sub: false,
            maxAgeSec: 14400, // 4 hours
            timeSkewSec: 15,
            user: user
        }, process.env.SECRET_KEY);
};

//register JWT auth strategy to server object
exports.addJwtAuth = async server => {
    // Register jwt with the server

    await server.register(Jwt);

    // Declare an authentication strategy using the jwt scheme.
    // Use keys: with a shared secret key OR json web key set uri.
    // Use verify: To determine how key contents are verified beyond signature.
    // If verify is set to false, the keys option is not required and ignored.
    // The verify: { aud, iss, sub } options are required if verify is not set to false.
    // The verify: { exp, nbf, timeSkewSec, maxAgeSec } parameters have defaults.
    // Use validate: To create a function called after token validation.

    server.auth.strategy('jwt', 'jwt', {
        keys: process.env.SECRET_KEY,
        verify: {
            aud: 'urn:audience:test',
            iss: 'urn:issuer:test',
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 14400, // 4 hours
            timeSkewSec: 15,
        },
        validate: async (artifacts, request, h) => {
            return {
                isValid: true,
                credentials: {user: artifacts.decoded.payload.user}
            };
        }
    });

    // Set the strategy

    server.auth.default('jwt');
}
