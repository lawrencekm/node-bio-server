// routes/download.js
const express = require('express');
const VeinData = require('../models/VeinData');
const router = express.Router();
const FormData = require('form-data');

router.get('/download', async (req, res) => {
    try {
        console.log('Received download request');
        const veinData = await VeinData.findOne().sort({ _id: 1 }).exec();
        if (!veinData) {
            console.error('No veindata found');
            return res.status(404).send('No veindata found');
        }

        const form = new FormData();
        form.append('sensortype', veinData.sensortype.toString());
        form.append('datatype', veinData.datatype.toString());
        form.append('id', veinData.id);
        form.append('name', veinData.name || '');
        form.append('address', veinData.address || '');
        form.append('enrolled', veinData.enrolled?.toISOString() || '');
        form.append('last_authenticated', veinData.last_authenticated?.toISOString() || '');
        form.append('authentication_count', veinData.authentication_count.toString());
        form.append('external_id', veinData.external_id || '');
        form.append('group_id', veinData.group_id || '');
        form.append('palm', veinData.palm.toString());
        form.append('veindata', veinData.veindata, 'veindata.bin');

        console.log('Form data constructed:');
        console.log(`sensortype: ${veinData.sensortype}`);
        console.log(`datatype: ${veinData.datatype}`);
        console.log(`id: ${veinData.id}`);
        console.log(`name: ${veinData.name}`);
        console.log(`address: ${veinData.address}`);
        console.log(`enrolled: ${veinData.enrolled}`);
        console.log(`last_authenticated: ${veinData.last_authenticated}`);
        console.log(`authentication_count: ${veinData.authentication_count}`);
        console.log(`external_id: ${veinData.external_id}`);
        console.log(`group_id: ${veinData.group_id}`);
        console.log(`palm: ${veinData.palm}`);
        console.log(`veindata length: ${veinData.veindata.length}`);

        const headers = form.getHeaders();
        res.set(headers);

        form.pipe(res);
    } catch (err) {
        console.error('Error fetching veindata:', err.message);
        res.status(500).send('Error fetching veindata: ' + err.message);
    }
});

router.get('/download64', async (req, res) => {
    const TAG = "Base64 Download:";
    try {
        console.log(TAG+'Received download64 request');
        //const veinData = await VeinData.findOne().sort({ _id: 1 }).exec();
        const veinData = await VeinData.findOne({ id: "lawr Base64 upload3" }).exec();
        if (!veinData) {
            console.error(TAG+'No veindata found');
            return res.status(404).send(TAG+'No veindata found');
        }
        console.log(TAG+' veindata found');

        const veindataBase64 = veinData.veindata.toString('base64');
        console.log(TAG+' veindataBase64 length:', veindataBase64.length);

        const response = {
            sensortype: veinData.sensortype,
            datatype: veinData.datatype,
            id: veinData.id,
            name: veinData.name || '',
            address: veinData.address || '',
            enrolled: veinData.enrolled?.toISOString() || '',
            last_authenticated: veinData.last_authenticated?.toISOString() || '',
            authentication_count: veinData.authentication_count,
            external_id: veinData.external_id || '',
            group_id: veinData.group_id || '',
            palm: veinData.palm,
            veindata: veindataBase64
        };
        console.log(response);

        res.json(response);
    } catch (err) {
        console.error(TAG+'Error fetching veindata:', err.message);
        res.status(500).send(TAG+'Error fetching veindata: ' + err.message);
    }
});

router.get('/download64/:groupId', async (req, res) => {
    const TAG = "Base64 Download:";
    const { groupId } = req.params;
    
    try {
        console.log(TAG + 'Received download64 request for group: ' + groupId);
        
        const veinDataList = await VeinData.find({ group_id: groupId }).exec();
        if (!veinDataList || veinDataList.length === 0) {
            console.error(TAG + 'No veindata found for group: ' + groupId);
            return res.status(404).send(TAG + 'No veindata found for group: ' + groupId);
        }
        
        console.log(TAG + ' veindata found for group: ' + groupId);

        const responseList = veinDataList.map(veinData => {
            const veindataBase64 = veinData.veindata.toString('base64');
            console.log(TAG + ' veindataBase64 length for ID ' + veinData.id + ':', veindataBase64.length);
            
            return {
                sensortype: veinData.sensortype,
                datatype: veinData.datatype,
                id: veinData.id,
                name: veinData.name || '',
                address: veinData.address || '',
                enrolled: veinData.enrolled?.toISOString() || '',
                last_authenticated: veinData.last_authenticated?.toISOString() || '',
                authentication_count: veinData.authentication_count,
                external_id: veinData.external_id || '',
                group_id: veinData.group_id || '',
                palm: veinData.palm,
                veindata: veindataBase64
            };
        });

        console.log(TAG + 'Response list:', responseList);
        res.json(responseList);
    } catch (err) {
        console.error(TAG + 'Error fetching veindata:', err.message);
        res.status(500).send(TAG + 'Error fetching veindata: ' + err.message);
    }
});

module.exports = router;
