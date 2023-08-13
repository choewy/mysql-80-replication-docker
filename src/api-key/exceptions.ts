import { BadRequestException } from '@nestjs/common';

export class AlreadyRegisteredApiKeyNameException extends BadRequestException {}
