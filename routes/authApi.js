const express = require('express');
const router = express.Router();
const AuthData = require('../models/AuthData');

// Route to handle API requests for adding AuthData
router.post('/authdata', async (req, res) => {
    console.log('Received auth data:', req.body);
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

        console.log('Parsed auth data:', {
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
        });

        // Convert authenticated_at to a Date object
        const authenticatedAtDate = new Date(parseInt(authenticated_at));
        console.log('Converted authenticated_at:', authenticatedAtDate);

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
            authenticated_at: authenticatedAtDate,
            type,
            far_achieved,
            synced,
            client_app_id
        });

        await newAuthData.save();
        console.log('AuthData saved successfully:', newAuthData);
        res.status(200).send('AuthData saved successfully');
    } catch (err) {
        console.error('Error saving auth data:', err.message);
        res.status(500).send('Server error: ' + err.message);
    }
});

module.exports = router;
