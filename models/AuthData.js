const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authDataSchema = new Schema({
    client_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true,
        index: true // Non-unique index
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

// Create a non-unique index on the user_id field
authDataSchema.index({ user_id: 1 });

// Note: The _id field is automatically created by MongoDB and is unique by default

const AuthData = mongoose.model('AuthData', authDataSchema);

module.exports = AuthData;
