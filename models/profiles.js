const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    age: String,
    pic: String,
    likeback: Boolean,
    liked: Boolean

});

module.exports = mongoose.model('profiles', customerSchema);