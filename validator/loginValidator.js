const yup = require("yup");

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(6).required(),
});

exports.validateLogin = (body) => {
  return loginSchema.validate(body, { abortEarly: false });
};
