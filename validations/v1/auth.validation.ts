import { Joi } from 'celebrate'

const register = {
  body: {
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .required()
      .regex(/^[ A-Za-z0-9_@./#&+-]*$/)
      .min(6)
      .max(16)
  }
}

const login = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string()
      .required()
      .regex(/^[ A-Za-z0-9_@./#&+-]*$/)
      .min(6)
      .max(16)
  }
}

export default {
  register,
  login
}