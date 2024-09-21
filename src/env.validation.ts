import { plainToInstance } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  JWT_SECRET: string;

  @IsNotEmpty()
  @IsString()
  ADMIN_USER: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  ADMIN_EMAIL: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  ADMIN_PASSWORD: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error('ENV validation failed: ' + errors.toString());
  }
  return validatedConfig;
}
