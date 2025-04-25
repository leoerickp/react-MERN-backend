const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {
    const events = await Event.find()
        .populate('user', 'name');

    res.json({
        ok: true,
        events
    })
};

const createEvents = async (req, res = response) => {
    const event = new Event(req.body);
    try {
        event.user = req.uid;

        const savedEvent = await event.save();
        res.json({
            ok: true,
            event: savedEvent
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Communicate with the administrator'
        })
    }
};

const updateEvents = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            res.status(404).json({
                ok: false,
                msg: 'Event does not exist'
            })
        }
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'user does not have rights to modify this event'
            })
        }
        const newEvent = {
            ...req.body,
            user: uid
        }
        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });
        res.json({
            ok: true,
            event: updatedEvent
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Communicate with the administrator'
        })
    }

};

const deleteEvents = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            res.status(404).json({
                ok: false,
                msg: 'Event does not exist'
            })
        }
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'user does not have rights to delete this event'
            })
        }
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        res.json({
            ok: true,
            event: deletedEvent
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Communicate with the administrator'
        })
    }
};
module.exports = {
    getEvents,
    createEvents,
    updateEvents,
    deleteEvents
}