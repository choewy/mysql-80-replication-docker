import { DocumentBuilder } from '@nestjs/swagger';

export class SwaggerDocument {
  public static of(title?: string, version?: string) {
    const builder = new DocumentBuilder().addBearerAuth(
      {
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'bearer',
      },
      'bearer',
    );

    if (title) {
      builder.setTitle('SWAGGER');
    }

    if (version) {
      builder.setVersion('v0');
    }

    return builder.build();
  }
}
