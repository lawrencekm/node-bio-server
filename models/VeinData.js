// models/VeinData.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const veinDataSchema = new Schema({
    sensortype: {
        type: Number,
        required: true
    },
    datatype: {
        type: Number,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    veindata: {
        type: Buffer,
        required: true
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    enrolled: {
        type: Date,
        default: Date.now
    },
    last_authenticated: {
        type: Date
    },
    authentication_count: {
        type: Number,
        default: 0
    },
    external_id: {
        type: String
    },
    group_id: {
        type: String
    },
    palm: {
        type: Number
    }
}, {
    versionKey: false // Disable the "__v" field which is used for versioning in Mongoose
});

// Create a composite unique index
veinDataSchema.index({ id: 1, sensortype: 1, datatype: 1 }, { unique: true });

const VeinData = mongoose.model('VeinData', veinDataSchema);

module.exports = VeinData;
