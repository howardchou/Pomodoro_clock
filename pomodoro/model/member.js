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
    },
    friends: [{ type: mongoose.Types.ObjectId, ref: 'User' }],

    sentRequest: [{
        username: { type: String, default: '' }
    }],
    request: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        username: { type: String, default: '' }
    }],
    friendsList: [{
        friendId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        friendName: { type: String, default: '' }
    }],
    totalRequest: { type: Number, default: 0 }
});


const memberModel = mongoose.model("member", memberSchema);

module.exports = memberModel;