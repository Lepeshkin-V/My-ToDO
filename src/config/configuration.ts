import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production').required(),
  PORT: Joi.number().port().required(),

  //database
  DB_URL: Joi.string().uri().required(),
  DB_NAME: Joi.string().required(),

  //jwt
  JWT_SECRET_KEY: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.number().integer().required(),
});

export const validationOptions = {
  abortEarly: true,
};

export default () => ({
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT as string, 10),

  db: {
    url: process.env.DB_URL,
    database: process.env.DB_NAME,
  },

  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
});
