'use strict';

const User = require('./user.model');

class UserService {
    static get(filter = {}) {
        return User.find(filter.where || {})
            .select(filter.select)
            .skip(+filter.skip)
            .limit(+filter.limit)
            .sort(filter.sort);
    }

    static create(user) {
        return User.create(user);
    }

    static update(id, user) {
        return User.updateOne({_id: id}, user);
    }

    static delete(id) {
        return User.findByIdAndRemove(id);
    }

}

module.exports = UserService;