import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    type: 'mysql',
                    host: configService.get<string>("DATABASE_HOST"),
                    port: configService.get<number>("DATABASE_PORT"),
                    username: configService.get<string>("DATABASE_USERNAME"),
                    password: configService.get<string>("DATABASE_PASSWORD"),
                    database: configService.get<string>("DATABASE_NAME"),
                    entities: [
                    ],
                    synchronize: true,
                }
            }

        }),
        TypeOrmModule.forFeature([
        ])
    ],
    exports: [
        TypeOrmModule
    ],
    providers: [],
    controllers: []
})
export class DatabaseModule { }