require('dotenv').config();

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../../data/models/userModel');

const genToken = user => {
    const payload = {
        subject: user.id,
        username: user.username
    }

    const options = {
        expiresIn: '1h'
    }

    const secret = process.env.SECRET;

    return jwt.sign(payload, secret, options);
}

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);

    user.password = hash;

    db.addUser(user, res);
});


router.post('/login', (req, res) => {
    let { username, password } = req.body;

    db.findBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = genToken(user);
                
                res.status(200).json({
                    message: `Welcome ${user.username}`,
                    token
                });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' })
            }
        })
        .catch(err => {
            res.status(500).json({ 
                message: 'Could Not Log In',
                err
             })
        });
});

module.exports = router;