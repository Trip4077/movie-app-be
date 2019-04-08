require('dotenv').config();

const jwt = require('jsonwebtoken');

/*
    Authentication middleware that expects an authorization JWT to be sent via header,
    and then verifies the user before proceeding
*/

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, process.env.SECRET, (err, dt) => {
            if(err) {
                res.status(401).json({ message: 'Problem With Authentication' })
            } else {
                next();
            }
        })
    } else {
        res.status(401).json({ message: 'Invalid Credentials' });
    }
}