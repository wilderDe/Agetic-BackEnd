import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmarthphonesModule } from './smarthphones/smarthphones.module';

@Module({
  imports: [
    //varaiables de entorno
    ConfigModule.forRoot(),

    //configuraciones de typeOrm
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      //para que carga automaticamente las entidades que se crearan
      autoLoadEntities:true,
      //para dev, para la sincronizacion
      synchronize: true,
    }),

    SmarthphonesModule,
  ],
})
export class AppModule {}
