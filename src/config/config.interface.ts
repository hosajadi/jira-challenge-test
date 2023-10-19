export type ENV = 'production' | 'stage' | 'develop' | 'localhost';
export interface Config {
  env: ENV;
  version: string;
  security: SecurityConfig;
}

export interface SecurityConfig {
  JWTSecret: string;
  expiresIn: string;
  refreshIn: string;
  bcryptSaltOrRound: string | number;
}
