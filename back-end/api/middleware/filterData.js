function filterData(user) {
    return {
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
}

module.exports = { filterData };