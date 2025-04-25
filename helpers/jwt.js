const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payoad = { uid, name };

        jwt.sign(payoad, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Token could not be generated');
            }
            resolve(token);
        });

    })
}

module.exports = {
    generateJWT
}