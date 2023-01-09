exports.admin_permission = async (request) => {
    try {
        if (request.auth.credentials.user.role !== "admin") {
            throw new Error('Permission denied');
        }
        return
    } catch (err) {
        throw new Error(err.message);
    }
}