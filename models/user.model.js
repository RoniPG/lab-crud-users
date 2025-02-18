const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const WORK_SALT_FACTOR = 10;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [EMAIL_PATTERN, 'Invalid email'],
    },
    password: {
        type: String,
        required: true,
        match: [PASSWORD_PATTERN, 'Invalid password'],
    },
    birthdate: {
        type: Date,
        required: true,
        validate: {
            validator: function (birthdate) {
                const now = new Date().getFullYear();
                return now - birthdate.getFullYear() >= 18;
            },
            message: 'You must be at least 18 years old',
        },
    },
    bio: String,
    avatar: String,
},
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = doc._id;
                delete ret._id;
                delete ret.password
                delete ret.__v;
                return ret;
            },
        },
    });

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, WORK_SALT_FACTOR)
            .then((hash) => {
                this.password = hash;
                next();
            })
            .catch(next);
    } else {
        next();
    }
});

const User = model('User', userSchema);
module.exports = User;
