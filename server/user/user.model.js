'use strict';

const Mongoose = require('mongoose');

const options = {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    toJSON: { virtuals: true }
};

const UserSchema = new Mongoose.Schema({

    name: { type: String, required: true, trim: true },
    email: {
        type: String, unique:true, required: true, trim: true, lowercase: true,
        match: /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/
    },
    tags: [ String ]

}, options);

UserSchema.pre('findOneAndUpdate', next => {
    if (this._update && this._update.updatedAt) {
        this._update.updatedAt = Date.now();
    }
    next();
});

module.exports = Mongoose.model('User', UserSchema);