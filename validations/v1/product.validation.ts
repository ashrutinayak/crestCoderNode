import { Joi } from "celebrate";

const add = {
  body: {
    name: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
  },
};

const update = {
  body: {
    name: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
  },
  params: {
    id: Joi.required(),
  },
};

const getById = {
  params: {
    id: Joi.required(),
  },
};

export default {
  add,
  update,
  getById
};
