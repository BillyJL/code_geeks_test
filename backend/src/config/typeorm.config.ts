import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfigFactory = async (
  configurationService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    host: configurationService.get('DB_HOST'),
    port: configurationService.get<number>('DB_PORT'),
    username: configurationService.get('DB_USERNAME'),
    password: configurationService.get('DB_PASSWORD'),
    database: configurationService.get('DB_DATABASE'),
    entities: [__dirname + '/../**/*.entity.ts'],
    autoLoadEntities: true,
    synchronize: true,
  };
};
