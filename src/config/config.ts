import { version } from '../../package.json';
import type { Config, ENV } from './config.interface';

const env: ENV = process.env.NEST_ENV as ENV;
export const config: Config = {
  env,
  version,
  security: {
    JWTSecret: process.env.JWT_SECRET!,
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN || '9000d',
    refreshIn: process.env.REFRESH_TOKEN_EXPIRE_IN || '9000d',
    bcryptSaltOrRound: Math.random(),
  },
};

export const configFactory = (): Config => config;
