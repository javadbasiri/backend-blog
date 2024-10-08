const mongoose = require("mongoose");
const yup = require("yup");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: String,
    unique: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now(),
  },
});

const schema = yup.object({
  userName: yup.string().required(),
  password: yup.string().required().min(4).max(6),
  email: yup.string().email().required(),
});

UserSchema.statics.validateAuth = function (body) {
  return schema.validate(body, { abortEarly: false });
};

module.exports = mongoose.model("User", UserSchema);
