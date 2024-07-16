import 'dotenv/config';
import * as joi from 'joi';

interface IEnv {
  PORT: number;
  PRODUCTS_MS_HOST: string;
  PRODUCTS_MS_PORT: number;
  ORDER_MS_HOST: string;
  ORDER_MS_PORT: number;
}

const envSchema = joi
  .object<IEnv>({
    PORT: joi.number().required(),
    PRODUCTS_MS_HOST: joi.string().required(),
    PRODUCTS_MS_PORT: joi.number().required(),
    ORDER_MS_HOST: joi.string().required(),
    ORDER_MS_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envs: IEnv = envVars;
