'use strict';

const Mongoose = require('mongoose');
const Bcrypt = require('bcryptjs');

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
    password: { type: String, required: true },
    tags: [ String ]

}, options);

/* ---------- MIDDLEWARE ---------- */

UserSchema.post('validate', async user => {
    let salt = await Bcrypt.genSalt(10);
    let hash = await Bcrypt.hash(user.password, salt);
    user.password = hash;
});

/* ---------- METHODS ---------- */

UserSchema.methods.compare = function(password) {
    return Bcrypt.compareSync(password, this.password);
};

module.exports = Mongoose.model('User', UserSchema);