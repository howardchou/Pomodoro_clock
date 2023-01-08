const mongoose = require('mongoose');
const memberSchema = mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true

    },
    pw: {
        type: String,
        require: true
    }
});

const memberModel = mongoose.model("member", memberSchema);

module.exports = memberModel;