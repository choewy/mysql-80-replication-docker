import { ApiKey, ApiKeyPlatform } from '@database';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class ApiKeyByPlatformQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiPropertyOptional({ type: String, enum: ApiKeyPlatform })
  @IsOptional()
  @IsEnum(ApiKeyPlatform)
  readonly platform?: ApiKeyPlatform;
}

export class ApiKeyRegistBodyDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  readonly name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  readonly clientId: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  @IsOptional()
  @IsString()
  readonly clientSecret?: string | null;

  public toEntity(platform: ApiKeyPlatform) {
    return ApiKey.of(platform, this.name, this.clientId, this.clientSecret);
  }
}
