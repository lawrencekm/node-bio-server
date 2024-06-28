const express = require('express');
const router = express.Router();
const VeinData = require('../models/VeinData'); // Assuming VeinData model is in models folder

// Route to display paginated, searchable table of VeinData
router.get('/veindata', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const searchQuery = req.query.search || '';

        const query = {
            $or: [
                { id: { $regex: searchQuery, $options: 'i' } },
                { name: { $regex: searchQuery, $options: 'i' } },
                { address: { $regex: searchQuery, $options: 'i' } },
                { external_id: { $regex: searchQuery, $options: 'i' } },
                { group_id: { $regex: searchQuery, $options: 'i' } }
            ]
        };

        const veindata = await VeinData.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        const count = await VeinData.countDocuments(query);

        res.render('veindata', {
            veindata,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            searchQuery
        });
    } catch (err) {
        res.status(500).send('Server error: ' + err.message);
    }
});

// Route to delete a VeinData record
router.delete('/veindata/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await VeinData.findByIdAndDelete(id);
        res.status(200).send('Record deleted successfully');
    } catch (err) {
        res.status(500).send('Server error: ' + err.message);
    }
});

module.exports = router;
