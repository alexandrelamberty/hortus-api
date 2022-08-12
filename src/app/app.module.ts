import { CacheInterceptor, CacheModule, CACHE_MANAGER, Inject, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as redisStore from 'cache-manager-redis-store'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from '../auth/auth.module'
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor'
import configuration from '../config/configuration'
import { DatabaseConfigService } from '../config/providers/DatabaseConfigService'
import { validate } from '../config/validators/env.validation'
import { SeedModule } from '../seeds/seed.module'
import { UsersModule } from '../users/users.module'
import { MulterModule } from '@nestjs/platform-express'
import { ScheduleModule } from '@nestjs/schedule'
import { NotificationModule } from '../notification/notification.module'
import { CultureModule } from '../culture/culture.module'
import { SensorsModule } from '../sensors/sensors.module'
import { MailModule } from '../mail/mail.module'
import { logger } from '../common/middleware/logger.middleware'
import { PlantModule } from 'src/plant/plant.module'

@Module({
  imports: [
    // Configuration - https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({
      /*       envFilePath: '.env',
            ignoreEnvFile: false, */
      isGlobal: true,
      cache: false,
      load: [configuration],
      validate,
    }),

    // Database - https://docs.nestjs.com/techniques/mongodb
    MongooseModule.forRootAsync({
      imports: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('mongo.uri'),
        useNewUrlParser: true,
        // https://stackoverflow.com/questions/51960171/node63208-deprecationwarning-collection-ensureindex-is-deprecated-use-creat
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService], // Inject DatabaseConfigService
    }),

    // Cache - https://docs.nestjs.com/techniques/caching
    /*     CacheModule.registerAsync({
          imports: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            isGlobal: true,
            store: redisStore,
            host: configService.get('cache.host'),
            port: configService.get('cache.port'),
            ttl: parseInt(configService.get('cache.ttl')),
          }),
          inject: [ConfigService], // Inject DatabaseConfigService
        }), */

    // Session TODO: serve the client with express to benefit from express session or check nestjs
    // FIXME

    // Static Server - https://docs.nestjs.com/recipes/serve-static
    // https://docs.nestjs.com/techniques/mvc
    /*
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/upload'),
    }),
    */

    // Task Scheduling - https://docs.nestjs.com/techniques/task-scheduling
    ScheduleModule.forRoot(),

    // File upload
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get('medias.upload'),
        isGlobal: true,
      }),
      inject: [ConfigService],
    }),

    // Domain modules
    AuthModule,
    UsersModule,
    NotificationModule,
    MailModule,
    PlantModule,
    SeedModule,
    CultureModule,
    SensorsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DatabaseConfigService,
    // {
    // provide: APP_INTERCEPTOR,
    // useClass: CacheInterceptor,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [DatabaseConfigService /*, CacheModule */],
})
export class AppModule {
  /*
    constructor(@Inject(CACHE_MANAGER) cacheManager) {
      const client = cacheManager.store.getClient()
      client.on('error', (error) => {
        console.error('CacheManager', error)
      })
    */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
  }
}