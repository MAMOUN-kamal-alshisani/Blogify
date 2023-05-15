import Joi from "joi";

const validator = (schema) => (payload) => {
  return schema.validate(payload, { abortEarly: false });
};

const signupValidator = Joi.object({
  UserName: Joi.string().min(2).max(25).required(),
  Email: Joi.string().email().required(),
  Password: Joi.string().min(6).max(20).required(),
});

export const validateSignUp = validator(signupValidator);
