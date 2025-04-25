const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'A user already exists with that email'
            })
        }


        user = new User(req.body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);


        await user.save();

        const token = await generateJWT(user._id, user.name);

        res.status(201).json({
            ok: true,
            uid: user._id,
            name: user.name,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comunicate with the admin'
        })
    }
};

const loginUser = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'A user does not exist with that email'
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid password'
            })
        }

        const token = await generateJWT(user._id, user.name);

        res.json({
            ok: true,
            msg: 'login',
            uid: user._id,
            name: user.name,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comunicate with the admin'
        })
    }
};

const revalidateToken = async (req, res = response) => {
    const uid = req.uid;
    const name = req.name;
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        token
    })
};

module.exports = { createUser, loginUser, revalidateToken };