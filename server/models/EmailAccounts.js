const mongoose = require('mongoose');

const emailAccountSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        // password: {
        //     type: String,
        //     required: true
        // },
        createdAt: {
            type: Date,
            default: Date.now
        },
        provider: {
            type: String,
            required: true,
            enum: ['gmail', 'yahoo', 'outlook', 'custom']
        },
        accessToken: {
            type: String,
            required: true
        },
        refreshToken: {
            type: String,
            required: true
        },
        tokenExpiry: {
            type: Date,
            required: true
        },
    }
)

const EmailAccount = mongoose.model('EmailAccount', emailAccountSchema);
module.exports = EmailAccount;