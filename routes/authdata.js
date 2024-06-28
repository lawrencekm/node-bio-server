const express = require('express');
const router = express.Router();
const AuthData = require('../models/AuthData'); // Assuming AuthData model is in models folder

// Route to display paginated, searchable table of AuthData
router.get('/authdata', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const searchQuery = req.query.search || '';

        const query = {
            $or: [
                { client_id: { $regex: searchQuery, $options: 'i' } },
                { user_id: { $regex: searchQuery, $options: 'i' } },
                { result: { $regex: searchQuery, $options: 'i' } },
                { type: { $regex: searchQuery, $options: 'i' } }
            ]
        };

        const authdata = await AuthData.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        const count = await AuthData.countDocuments(query);

        res.render('authdata', {
            authdata,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            searchQuery
        });
    } catch (err) {
        res.status(500).send('Server error: ' + err.message);
    }
});

// Route to delete an AuthData record
router.delete('/authdata/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await AuthData.findByIdAndDelete(id);
        res.status(200).send('Record deleted successfully');
    } catch (err) {
        res.status(500).send('Server error: ' + err.message);
    }
});

module.exports = router;
