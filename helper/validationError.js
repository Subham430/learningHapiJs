module.exports = async (_request, _h, err) => {
    if (process.env.NODE_ENV === 'production') {
        // In prod, log a limited error message and throw the default Bad Request error.
        console.error('ValidationError:', err.message); // Better to use an actual logger here.
        throw Boom.badRequest(`Invalid request payload input`);
    } else {
        // During development, log and respond with the full error.
        console.error('ValidationError:', err.message);
        throw err;
    }
};