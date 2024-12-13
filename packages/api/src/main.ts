import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as serverless from 'serverless-http';

async function bootstrap(entrypoint: any) {
  const app = express();
  const nestApp = await NestFactory.create(entrypoint, new ExpressAdapter(app));

  if (process.env.NODE_ENV === 'production') {
    nestApp.setGlobalPrefix('/.netlify/functions/main');
    nestApp.use(express.json({ limit: '50mb' }));
    nestApp.use(express.urlencoded({ limit: '50mb', extended: true }));
  }

  nestApp.enableCors();

  await nestApp.init();
  return { expressApp: app, nestApp };
}

let cachedHandler: any;
const proxyApi = async (entrypoint: any, event: any, context: any) => {
  if (!cachedHandler) {
    const { expressApp } = await bootstrap(entrypoint);
    cachedHandler = serverless(expressApp);
  }

  return cachedHandler(event, context);
};

export const handler = async (event: any, context: any) =>
  proxyApi(AppModule, event, context);

if (process.env.NODE_ENV !== 'production') {
  (async () => {
    const { expressApp } = await bootstrap(AppModule);
    const PORT = 3000;
    expressApp.listen(PORT, () => {
      console.log(`NestJS server is running on http://localhost:${PORT}`);
    });
  })();
}
