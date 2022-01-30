var Mongoose 	= require('mongoose');
var bcrypt      = require('bcrypt-nodejs');

const SALT_WORK_FACTOR = 10;

var UserSchema = new Mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String, default: null },
    picture:  { type: String, default: ''},
    online: { type: String, default: 'offline' }
});

UserSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password'))  {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        });
    });
});


UserSchema.methods.validatePassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err)  {
            return callback(err);
        }

        callback(null, isMatch);
    });
};

var userModel = Mongoose.model('user', UserSchema);

module.exports = userModel;