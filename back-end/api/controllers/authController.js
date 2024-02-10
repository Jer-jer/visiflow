//DONE CHECKING
require('dotenv').config();

exports.login = async (req, res) => {
    console.log('logged-in');
    res.send(200);
};

exports.logout = async (req, res, next) => {
    if(!req.user) {
        res.status(400).json({msg: 'Not logged-in'});
    } else {
        req.logout( () => {
            res.status(201).json({msg: 'Successfully logged-out'});
        });
    }
}

