const Notification = require('../models/notification');

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({});
        return res.status(200).json({ Notifications: notifications });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve notifications from the database'})
    }
}

exports.updateNotification = async (req, res) => {
    const { _id, type, recipient, is_read, visitor_name, host_name, date, time, location, purpose } = req.body;
    
    try {
        const notificationDB = await Notification.findById(_id);
        if (!notificationDB) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        const updateFields = {
            type: type || notificationDB.type,
            recipient: recipient || notificationDB.recipient,
            is_read: is_read || notificationDB.is_read,
            content: {
                visitor_name: visitor_name || notificationDB.visitor_name,
                host_name: host_name || notificationDB.host_name,
                date: date || notificationDB.date,
                time: time || notificationDB.time,
                location: location || notificationDB.location,
                purpose: purpose || notificationDB.purpose
            }
        }

        const filteredUpdateFields = Object.fromEntries(
            Object.entries(updateFields).filter(([ key, value ]) => value !== undefined)
        );

        if (Object.keys(filteredUpdateFields).length === 0) {
            return res.status(400).json({ error: 'No valid fields to update' });
        }

        const updatedNotification = await Notification.findByIdAndUpdate(
            _id,
            filteredUpdateFields,
            { new: true }
        );

        res.status(201).json({ Notification: updatedNotification });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to update notification" });
    }
}