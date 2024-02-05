const isLoggedIn = (res, req, next) => {
    if(req.user) next();
    else res.send(401);
};

module.exports = { isLoggedIn };