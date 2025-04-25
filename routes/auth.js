/*
    Users / Auth routes
    host/api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/field-validator');

const router = Router();
const { createUser, revalidateToken, loginUser } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');

router.post(
    '/new',
    [
        check('name', 'Name is mandatory').not().isEmpty(),
        check('email', 'Email is mandatory').isEmail(),
        check('password', 'Password must be 6 characters').isLength({ min: 6 }),
        validateFields
    ],
    createUser);

router.post(
    '/',
    [
        check('email', 'Email is mandatory').isEmail(),
        check('password', 'Password must be 6 characters').isLength({ min: 6 }),
        validateFields
    ],
    loginUser);

router.get('/renew', [
    validateJWT
], revalidateToken);

module.exports = router;