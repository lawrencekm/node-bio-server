const express = require('express');
const router = express.Router();
const AuthData = require('../models/AuthData');

// Route to handle API requests for adding AuthData
router.post('/authdata', async (req, res) => {
    console.log(req.body);
    try {
        const {
            client_id,
            user_id,
            sensortype,
            datatype,
            result,
            retry_count,
            silhouette,
            name,
            location,
            authenticated_at,
            type,
            far_achieved,
            synced,
            client_app_id
        } = req.body;

        const newAuthData = new AuthData({
            client_id,
            user_id,
            sensortype,
            datatype,
            result,
            retry_count,
            silhouette,
            name,
            location,
            authenticated_at: new Date(authenticated_at),
            type,
            far_achieved,
            synced,
            client_app_id
        });

        await newAuthData.save();
        res.status(200).send('AuthData saved successfully');
    } catch (err) {
        res.status(500).send('Server error: ' + err.message);
    }
});

module.exports = router;
