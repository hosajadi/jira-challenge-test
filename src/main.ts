import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  const port = process.env.API_SERVICE_PORT || 3003;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`app is listening on ${port}`);
}

void bootstrap();
