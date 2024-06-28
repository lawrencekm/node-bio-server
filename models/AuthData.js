const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authDataSchema = new Schema({
    client_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    sensortype: {
        type: Number,
        required: true
    },
    datatype: {
        type: Number,
        required: true
    },
    result: {
        type: String,
        required: true
    },
    retry_count: {
        type: Number,
        required: true
    },
    silhouette: {
        type: String,
        default: null
    },
    name: {
        type: String,
        default: null
    },
    location: {
        type: String,
        default: null
    },
    authenticated_at: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        default: null
    },
    far_achieved: {
        type: Number,
        required: true
    },
    synced: {
        type: Number,
        required: true
    },
    client_app_id: {
        type: String,
        default: null
    }
}, {
    versionKey: false // Disable the "__v" field which is used for versioning in Mongoose
});

// Create a composite unique index without client_id
authDataSchema.index({ user_id: 1, client_app_id: 1, sensortype: 1, datatype: 1 }, { unique: true });

const AuthData = mongoose.model('AuthData', authDataSchema);

module.exports = AuthData;
