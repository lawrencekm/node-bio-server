// routes/upload.js
const express = require('express');
const multer = require('multer');
const VeinData = require('../models/VeinData');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('veindata'), async (req, res) => {
    console.log('Received upload request');

    console.log('Request body:', req.body);
    console.log('Request file:', req.file); // Log the file object

    if (!req.file) {
        console.error('No file uploaded');
        return res.status(400).send('No file uploaded.');
    }

    const veinData = new VeinData({
        sensortype: req.body.sensortype,
        datatype: req.body.datatype,
        id: req.body.id,
        veindata: req.file.buffer,
        name: req.body.name,
        address: req.body.address,
        enrolled: req.body.enrolled,
        last_authenticated: req.body.last_authenticated,
        authentication_count: req.body.authentication_count,
        external_id: req.body.external_id,
        group_id: req.body.group_id,
        palm: req.body.palm
    });

    try {
        await veinData.save();
        console.log('Upload successful');
        res.status(200).send('Upload successful');
    } catch (err) {
        console.error('Error saving file:', err.message);
        res.status(500).send('Error saving file: ' + err.message);
    }
});


//upload 1 by one
router.post('/upload64', async (req, res) => {
    try {
        console.log('Received upload Base64 request');
        console.log(req);

        const { sensortype, datatype, id, name, address, enrolled, last_authenticated, authentication_count, external_id, group_id, palm, veindata } = req.body;

        const veindataBuffer = Buffer.from(veindata, 'base64');

        const veinData = new VeinData({
            sensortype,
            datatype,
            id: id,
            veindata: veindataBuffer,
            name,
            address,
            enrolled: enrolled ? new Date(enrolled) : null,
            last_authenticated: last_authenticated ? new Date(last_authenticated) : null,
            authentication_count,
            external_id,
            group_id,
            palm
        });

        await veinData.save();
        res.status(200).send('Upload Base64 successful');
    } catch (err) {
        console.error('Error Base64 saving file:', err.message);
        res.status(500).send('Error Base64 saving file: ' + err.message);
    }
});
module.exports = router;
