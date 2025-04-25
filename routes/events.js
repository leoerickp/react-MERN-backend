const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/field-validator');

const router = Router();
const { validateJWT } = require('../middlewares/validate-jwt');
const { isDate } = require('../helpers/isDate');
const { getEvents, createEvents, updateEvents, deleteEvents } = require('../controllers/events')

router.use(validateJWT);

router.get('/', getEvents);

router.post(
    '/',
    [
        check('title', 'Title is mandatory').not().isEmpty(),
        check('start', 'Start is mandatory').custom(isDate),
        check('end', 'End is mandatory').custom(isDate),
        validateFields
    ],
    createEvents
);

router.put(
    '/:id',
    [
    ],
    updateEvents
);

router.delete(
    '/:id',
    [
    ],
    deleteEvents
);

module.exports = router;