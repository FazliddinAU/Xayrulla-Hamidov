import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2')
  const config = new DocumentBuilder()
    .setTitle('Xayrulla Hamidov TV API')
    .setDescription('API documentation for the TV application')
    .setVersion('1.0.0')
    .setContact(
      'Hamidov Team',
      'https://hamidov.com',
      'support@hamidov.com',
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .addSecurityRequirements('bearer')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [],
    deepScanRoutes: true,
  });

  SwaggerModule.setup('api/v2/api-docs', app, document);
  app.use('', (req, res) => {
    res.redirect('/api/v2/api-docs');
  });
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');

  console.log(
    `🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}`,
  );
  console.log(
    `📚 Swagger documentation available at: http://localhost:${
      process.env.PORT ?? 3000
    }/api/v2/api-docs`,
  );
}
bootstrap();
